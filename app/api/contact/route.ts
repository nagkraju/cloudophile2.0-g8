import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(120).optional().default(''),
  topic: z.enum(['executive-advisory', 'ai-strategy', 'cloud-platform', 'speaking', 'other']),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(0).optional().default(''),
})

const topicLabels: Record<z.infer<typeof contactSchema>['topic'], string> = {
  'executive-advisory': 'Executive advisory',
  'ai-strategy': 'Enterprise AI strategy',
  'cloud-platform': 'Cloud or platform strategy',
  speaking: 'Speaking or leadership session',
  other: 'Another conversation',
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character)
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ message: 'Please submit a valid message.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 })
  if (parsed.data.website) return NextResponse.json({ message: 'Thank you. Your message has been received.' })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    return NextResponse.json({ message: 'Email delivery is not configured yet. Please try again later.' }, { status: 503 })
  }

  const { name, email, company, topic, message } = parsed.data
  const safe = { name: escapeHtml(name), email: escapeHtml(email), company: escapeHtml(company), topic: escapeHtml(topicLabels[topic]), message: escapeHtml(message).replace(/\n/g, '<br />') }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Cloudophile inquiry: ${topicLabels[topic]} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nTopic: ${topicLabels[topic]}\n\n${message}`,
      html: `<h2>New Cloudophile inquiry</h2><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Company:</strong> ${safe.company || 'Not provided'}</p><p><strong>Topic:</strong> ${safe.topic}</p><hr /><p>${safe.message}</p>`,
    })
    if (error) throw new Error(error.message)
    return NextResponse.json({ message: 'Your message has been sent.' })
  } catch {
    return NextResponse.json({ message: 'Your message could not be sent right now. Please try again later.' }, { status: 502 })
  }
}
