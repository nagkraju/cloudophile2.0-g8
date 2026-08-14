'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type Status = { type: 'idle' | 'error' | 'success'; message?: string }

export function ContactForm() {
  const [topic, setTopic] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.nativeEvent instanceof SubmitEvent && event.nativeEvent.submitter === null) return
    const form = event.currentTarget
    const formData = new FormData(form)
    setIsPending(true)
    setStatus({ type: 'idle' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          topic,
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      })
      const result = await response.json() as { message?: string }
      if (!response.ok) throw new Error(result.message || 'Your message could not be sent.')
      form.reset()
      setTopic('')
      setStatus({ type: 'success', message: 'Thank you. Your message has been sent and I’ll be in touch soon.' })
    } catch (error) {
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Your message could not be sent.' })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card p-6 sm:p-8">
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field><FieldLabel htmlFor="name">Name <span aria-hidden="true" className="text-primary">*</span><span className="sr-only">required</span></FieldLabel><Input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} className="h-11" /></Field>
          <Field><FieldLabel htmlFor="email">Work email <span aria-hidden="true" className="text-primary">*</span><span className="sr-only">required</span></FieldLabel><Input id="email" name="email" type="email" autoComplete="email" required maxLength={160} className="h-11" /></Field>
          <Field><FieldLabel htmlFor="company">Company</FieldLabel><Input id="company" name="company" autoComplete="organization" maxLength={120} className="h-11" /></Field>
          <Field><FieldLabel htmlFor="phone">Contact#</FieldLabel><Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className="h-11" /></Field>
        </div>
        <Field data-invalid={!topic && status.type === 'error'}>
          <FieldLabel htmlFor="topic">What would you like to discuss?</FieldLabel>
          <Select value={topic} onValueChange={(value) => setTopic(value ?? '')} required>
            <SelectTrigger id="topic" className="h-11 w-full" aria-invalid={!topic && status.type === 'error'}><SelectValue placeholder="Select a topic" /></SelectTrigger>
            <SelectContent><SelectGroup><SelectItem value="executive-advisory">Executive advisory</SelectItem><SelectItem value="ai-strategy">Enterprise AI strategy</SelectItem><SelectItem value="cloud-platform">Cloud or platform strategy</SelectItem><SelectItem value="speaking">Speaking or leadership session</SelectItem><SelectItem value="career-coaching">Career coaching</SelectItem><SelectItem value="big-tech-interview">Big Tech Interview preparation</SelectItem><SelectItem value="resume-writing">Resume writing</SelectItem><SelectItem value="other">Another conversation</SelectItem></SelectGroup></SelectContent>
          </Select>
        </Field>
        <Field><FieldLabel htmlFor="message">How can I help?</FieldLabel><Textarea id="message" name="message" required minLength={20} maxLength={3000} rows={7} placeholder="Share the decision, challenge, or opportunity you are working through." /></Field>
        <div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <FieldDescription>By submitting, you agree that your details may be used to respond to this inquiry. No mailing lists, no automated follow-ups.</FieldDescription>
        {status.type === 'error' && <FieldError>{status.message}</FieldError>}
        {status.type === 'success' && <div role="status" className="flex items-start gap-3 border border-primary/40 bg-primary/5 p-4 text-sm text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><p>{status.message}</p></div>}
        <Button type="submit" size="lg" disabled={isPending || !topic}>{isPending ? 'Sending…' : 'Send message'} <Send data-icon="inline-end" /></Button>
      </FieldGroup>
    </form>
  )
}
