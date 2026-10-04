import { Clock3, Mail, ShieldCheck } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

import { AccentedHeading } from '@/components/accented-heading'
import { CloudMesh } from '@/components/canvas/CloudMesh'
import { ContactForm } from '@/components/contact-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getContactExpectations, getContactForm, getPageContent, getPageCopy } from '@/lib/site-content'

export const dynamic = 'force-dynamic'

const expectationIcons: Record<string, typeof Mail> = { clock: Clock3, shield: ShieldCheck, mail: Mail }

const topmateLinks = [
  { label: 'Book a session of your choice', href: 'https://topmate.io/nag_kakarla' },
  { label: 'Career development pack', href: 'https://topmate.io/nag_kakarla/new/8nACJGX9aW' },
  { label: 'Create your branding on LinkedIn', href: 'https://topmate.io/nag_kakarla/new/1NuAShExTl' },
  { label: 'Personalized coaching for Big Tech career', href: 'https://topmate.io/nag_kakarla/new/9APqHp4eYU' },
]

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation with Nag Kakarla about executive advisory, enterprise AI, cloud platforms, or technology leadership.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const [content, form] = await Promise.all([getPageContent('contact'), getContactForm()])
  const expectations = await getContactExpectations()
  return (
    <main>
      <SiteHeader />
      <section className="relative isolate overflow-hidden border-b border-border"><CloudMesh /><div className="relative mx-auto grid max-w-screen-2xl gap-8 px-4 sm:px-6 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-10">
            <div><p className="text-center font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p><AccentedHeading className="mt-6 text-balance text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">{content.title}</AccentedHeading><p className="mx-auto mt-8 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">{content.intro}</p></div>
            <div className="divide-y divide-border border-y border-border">{expectations.map(({ icon, title, copy }) => { const Icon = expectationIcons[icon] ?? Mail; return <div key={title} className="flex gap-4 py-5"><Icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h2 className="font-medium">{title}</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></div> })}</div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="border border-border bg-card p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight">Book me on</h2>
                <a href="https://topmate.io/nag_kakarla" target="_blank" rel="noopener noreferrer" aria-label="Topmate" className="rounded bg-white px-2 py-1"><Image src="/topmate-logo.svg" alt="Topmate" width={194} height={36} className="h-6 w-auto" /></a>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {topmateLinks.map(({ label, href }) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-24 items-center justify-center rounded-xl border border-border p-4 text-center text-base font-medium sm:text-lg transition-colors hover:border-primary hover:text-primary">{label}</a>)}
              </div>
            </div>
            <ContactForm copy={form} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}



