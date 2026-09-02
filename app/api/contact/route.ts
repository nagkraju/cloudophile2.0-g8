import { TableClient } from '@azure/data-tables'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80), email: z.string().trim().email().max(160), company: z.string().trim().max(120).optional().default(''),
  phone: z.string().trim().max(40).regex(/^[+()\-\s\d.]*$/).optional().default(''),
  topic: z.enum(['executive-advisory', 'ai-strategy', 'cloud-platform', 'speaking', 'career-coaching', 'big-tech-interview', 'resume-writing', 'other']),
  message: z.string().trim().min(20).max(3000), website: z.string().max(200).optional().default(''),
})

type Topic = z.infer<typeof contactSchema>['topic']
const topicLabels: Record<Topic, string> = { 'executive-advisory': 'Executive advisory', 'ai-strategy': 'Enterprise AI strategy', 'cloud-platform': 'Cloud or platform strategy', speaking: 'Speaking or leadership session', 'career-coaching': 'Career coaching', 'big-tech-interview': 'Big Tech Interview preparation', 'resume-writing': 'Resume writing', other: 'Another conversation' }

function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character) }

async function getInquiryTable() {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  if (!connectionString) return null
  const client = TableClient.fromConnectionString(connectionString, process.env.AZURE_CONTACT_TABLE || 'ContactInquiries')
  await client.createTable().catch((error: { statusCode?: number }) => { if (error.statusCode !== 409) throw error })
  return client
}

export async function POST(request: Request) {
  let payload: unknown
  try { payload = await request.json() } catch { return NextResponse.json({ message: 'Please submit a valid message.' }, { status: 400 }) }
  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 })
  if (parsed.data.website) return NextResponse.json({ message: 'Thank you. Your message has been received.' })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Cloudophile <contact@cloudophile.com>'
  const fallbackFrom = 'Cloudophile <onboarding@resend.dev>'
  if (!apiKey || !to) return NextResponse.json({ message: 'Message delivery is not configured yet. Please try again later.' }, { status: 503 })

  const { name, email, company, phone, topic, message } = parsed.data
  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  let table: Awaited<ReturnType<typeof getInquiryTable>> = null
  const entity = { partitionKey: createdAt.slice(0, 7), rowKey: id, createdAt, name, email, company, phone, topic, topicLabel: topicLabels[topic], message, emailDelivery: 'pending' }

  if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
    try { table = await getInquiryTable(); if (table) await table.createEntity(entity) }
    catch { return NextResponse.json({ message: 'Your message could not be saved right now. Please try again later.' }, { status: 502 }) }
  }

  const safe = { name: escapeHtml(name), email: escapeHtml(email), company: escapeHtml(company), phone: escapeHtml(phone), topic: escapeHtml(topicLabels[topic]), message: escapeHtml(message).replace(/\n/g, '<br />') }
  try {
    const resend = new Resend(apiKey)
    const subjectName = name.replace(/[\r\n]/g, ' ')
    const payloadToSend = {
      to, replyTo: email, subject: `Cloudophile inquiry: ${topicLabels[topic]} — ${subjectName}`,
      text: `Name: ${name}\nEmail: ${email}\nContact#: ${phone || 'Not provided'}\nCompany: ${company || 'Not provided'}\nTopic: ${topicLabels[topic]}\n\n${message}`,
      html: `<h2>New Cloudophile inquiry</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Contact#:</strong> ${safe.phone || 'Not provided'}</p><p><strong>Company:</strong> ${safe.company || 'Not provided'}</p><p><strong>Topic:</strong> ${safe.topic}</p><hr /><p>${safe.message}</p>`,
    }
    let { error } = await resend.emails.send({ from, ...payloadToSend })

    // Until a sending domain is verified in Resend, fall back to the shared test sender.
    if (error && /domain is not verified/i.test(error.message || '')) {
      error = (await resend.emails.send({ from: fallbackFrom, ...payloadToSend })).error
    }

    // The shared test sender may only deliver to the Resend account owner; retry with that address.
    const ownerMatch = error?.message?.match(/your own email address \(([^)]+)\)/i)
    if (ownerMatch) {
      error = (await resend.emails.send({ from: fallbackFrom, ...payloadToSend, to: ownerMatch[1], subject: `${payloadToSend.subject} (intended for ${to})` })).error
    }

    if (error) throw new Error(`${error.name}: ${error.message}`)
    if (table) await table.updateEntity({ partitionKey: entity.partitionKey, rowKey: id, emailDelivery: 'sent', emailDeliveredAt: new Date().toISOString() }, 'Merge')
    return NextResponse.json({ message: 'Your message has been sent.' })
  } catch {
    if (table) await table.updateEntity({ partitionKey: entity.partitionKey, rowKey: id, emailDelivery: 'failed', emailFailedAt: new Date().toISOString() }, 'Merge').catch(() => undefined)
    return NextResponse.json({ message: table ? 'Your details were saved, but email delivery failed. Please try again later.' : 'Email delivery failed. Please try again later.' }, { status: 502 })
  }
}
