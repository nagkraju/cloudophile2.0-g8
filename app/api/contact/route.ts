import { BlobServiceClient } from '@azure/storage-blob'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(120).optional().default(''),
  topic: z.enum(['executive-advisory', 'ai-strategy', 'cloud-platform', 'speaking', 'career-coaching', 'big-tech-interview', 'resume-writing', 'other']),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(200).optional().default(''),
})

type Topic = z.infer<typeof contactSchema>['topic']
const topicLabels: Record<Topic, string> = {
  'executive-advisory': 'Executive advisory',
  'ai-strategy': 'Enterprise AI strategy',
  'cloud-platform': 'Cloud or platform strategy',
  speaking: 'Speaking or leadership session',
  'career-coaching': 'Career coaching',
  'big-tech-interview': 'Big Tech Interview preparation',
  'resume-writing': 'Resume writing',
  other: 'Another conversation',
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character)
}

async function getInquiryBlob(id: string) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  if (!connectionString) throw new Error('Storage is not configured')
  const service = BlobServiceClient.fromConnectionString(connectionString)
  const container = service.getContainerClient(process.env.AZURE_STORAGE_CONTAINER || 'contact-inquiries')
  await container.createIfNotExists()
  return container.getBlockBlobClient(`${new Date().toISOString().slice(0, 10)}/${id}.json`)
}

export async function POST(request: Request) {
  let payload: unknown
  try { payload = await request.json() } catch { return NextResponse.json({ message: 'Please submit a valid message.' }, { status: 400 }) }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 })
  if (parsed.data.website) return NextResponse.json({ message: 'Thank you. Your message has been received.' })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Cloudophile <onboarding@resend.dev>'
  if (!apiKey || !to) return NextResponse.json({ message: 'Message delivery is not configured yet. Please try again later.' }, { status: 503 })

  const { name, email, company, topic, message } = parsed.data
  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  let blob: Awaited<ReturnType<typeof getInquiryBlob>> | null = null

  if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
    try {
      blob = await getInquiryBlob(id)
      const record = JSON.stringify({ id, createdAt, name, email, company, topic, topicLabel: topicLabels[topic], message, emailDelivery: 'pending' }, null, 2)
      await blob.upload(record, Buffer.byteLength(record), { blobHTTPHeaders: { blobContentType: 'application/json' }, conditions: { ifNoneMatch: '*' } })
    } catch {
      return NextResponse.json({ message: 'Your message could not be saved right now. Please try again later.' }, { status: 502 })
    }
  }

  const safe = { name: escapeHtml(name), email: escapeHtml(email), company: escapeHtml(company), topic: escapeHtml(topicLabels[topic]), message: escapeHtml(message).replace(/\n/g, '<br />') }
  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from, to, replyTo: email,
      subject: `Cloudophile inquiry: ${topicLabels[topic]} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nTopic: ${topicLabels[topic]}\n\n${message}`,
      html: `<h2>New Cloudophile inquiry</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Company:</strong> ${safe.company || 'Not provided'}</p><p><strong>Topic:</strong> ${safe.topic}</p><hr /><p>${safe.message}</p>`,
    })
    if (error) throw new Error(error.message)
    const delivered = JSON.stringify({ id, createdAt, name, email, company, topic, topicLabel: topicLabels[topic], message, emailDelivery: 'sent', emailDeliveredAt: new Date().toISOString() }, null, 2)
    if (blob) await blob.uploadData(Buffer.from(delivered), { overwrite: true, blobHTTPHeaders: { blobContentType: 'application/json' } })
    return NextResponse.json({ message: 'Your message has been sent.' })
  } catch {
    const failed = JSON.stringify({ id, createdAt, name, email, company, topic, topicLabel: topicLabels[topic], message, emailDelivery: 'failed', emailFailedAt: new Date().toISOString() }, null, 2)
    if (blob) await blob.uploadData(Buffer.from(failed), { overwrite: true, blobHTTPHeaders: { blobContentType: 'application/json' } }).catch(() => undefined)
    return NextResponse.json({ message: blob ? 'Your details were saved, but email delivery failed. Please try again later.' : 'Email delivery failed. Please try again later.' }, { status: 502 })
  }
}
