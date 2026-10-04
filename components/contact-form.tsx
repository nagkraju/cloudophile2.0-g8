'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { FormCopy } from '@/lib/fallback-content'

type Status = { type: 'idle' | 'error' | 'success'; message?: string }

export function ContactForm({ copy }: { copy: FormCopy }) {
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
      setStatus({ type: 'success', message: copy.success })
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
          <Field><FieldLabel htmlFor="name">{copy.name} <span aria-hidden="true" className="text-primary">*</span><span className="sr-only">required</span></FieldLabel><Input id="name" name="name" autoComplete="name" required minLength={2} maxLength={80} className="h-11" /></Field>
          <Field><FieldLabel htmlFor="email">{copy.email} <span aria-hidden="true" className="text-primary">*</span><span className="sr-only">required</span></FieldLabel><Input id="email" name="email" type="email" autoComplete="email" required maxLength={160} className="h-11" /></Field>
          <Field><FieldLabel htmlFor="company">{copy.company}</FieldLabel><Input id="company" name="company" autoComplete="organization" maxLength={120} className="h-11" /></Field>
          <Field><FieldLabel htmlFor="phone">{copy.phone}</FieldLabel><Input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className="h-11" /></Field>
        </div>
        <Field data-invalid={!topic && status.type === 'error'}>
          <FieldLabel htmlFor="topic">{copy.topicLabel}</FieldLabel>
          <Select value={topic} onValueChange={(value) => setTopic(value ?? '')} required>
            <SelectTrigger id="topic" className="h-11 w-full" aria-invalid={!topic && status.type === 'error'}><SelectValue placeholder={copy.topicPlaceholder} /></SelectTrigger>
            <SelectContent><SelectGroup>{copy.topics.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectGroup></SelectContent>
          </Select>
        </Field>
        <Field><FieldLabel htmlFor="message">{copy.messageLabel} <span aria-hidden="true" className="text-primary">*</span><span className="sr-only">required</span></FieldLabel><Textarea id="message" name="message" required minLength={20} maxLength={3000} rows={7} placeholder={copy.messagePlaceholder} /></Field>
        <div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <FieldDescription>{copy.disclaimer}</FieldDescription>
        {status.type === 'error' && <FieldError>{status.message}</FieldError>}
        {status.type === 'success' && <div role="status" className="flex items-start gap-3 border border-primary/40 bg-primary/5 p-4 text-sm text-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><p>{status.message}</p></div>}
        <Button type="submit" size="lg" disabled={isPending || !topic}>{isPending ? copy.sending : copy.submit} <Send data-icon="inline-end" /></Button>
      </FieldGroup>
    </form>
  )
}


