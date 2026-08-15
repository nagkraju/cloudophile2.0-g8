import { Clock3, Mail, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'

import { ContactForm } from '@/components/contact-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPageContent } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation with Nag Kakarla about executive advisory, enterprise AI, cloud platforms, or technology leadership.',
  alternates: { canonical: '/contact' },
}

const expectations = [
  { icon: Clock3, title: 'A considered response', copy: 'Expect a personal reply, typically within two business days.' },
  { icon: ShieldCheck, title: 'Confidential by default', copy: 'Your context is used only to understand and respond to your inquiry.' },
  { icon: Mail, title: 'Direct conversation', copy: 'No sales sequence. No newsletter enrollment. Just a useful first exchange.' },
]

export default async function ContactPage() {
  const content = await getPageContent('contact')
  return (
    <main>
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-10">
            <div><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p><h1 className="mt-6 text-balance text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">{content.title}</h1><p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{content.intro}</p></div>
            <div className="divide-y divide-border border-y border-border">{expectations.map(({ icon: Icon, title, copy }) => <div key={title} className="flex gap-4 py-5"><Icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h2 className="font-medium">{title}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div>)}</div>
          </div>
          <ContactForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
