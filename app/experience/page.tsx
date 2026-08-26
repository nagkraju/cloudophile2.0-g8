import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { AccentedHeading } from '@/components/accented-heading'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { getPageContent } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Nag Kakarla’s technology leadership journey across Microsoft, AWS, Amazon, Fidelity, Intuit, and Cisco.',
  alternates: { canonical: '/experience' },
}

const roles = [
  { period: 'Now', company: 'Microsoft', role: 'Director of Technology, Cloud & AI — EMEA', copy: 'Partnering with enterprise leaders to shape cloud, AI, and platform strategies that move from ambition to production.' },
  { period: 'Previously', company: 'AWS & Amazon', role: 'Cloud and technology leadership', copy: 'Led complex architecture and transformation conversations where scale, resilience, and business outcomes had to move together.' },
  { period: 'Foundation', company: 'Fidelity · Intuit · Cisco', role: 'Enterprise platforms and distributed systems', copy: 'Built deep operating experience across financial services, software platforms, infrastructure, and globally distributed systems.' },
]

const principles = [
  ['Start with the decision', 'Make the business and operating decision explicit before choosing technology.'],
  ['Design for reality', 'Architecture must account for people, controls, failure modes, and change—not only the ideal state.'],
  ['Create durable leverage', 'Invest in platforms and capabilities that compound beyond a single program or migration.'],
]

export default async function ExperiencePage() {
  const content = await getPageContent('experience')
  return (
    <main>
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8 lg:py-36">
          <p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p>
          <AccentedHeading className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">{content.title}</AccentedHeading>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{content.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-muted-foreground">Techno-leadership journey</p>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {roles.map((item) => (
            <article key={item.company} className="grid gap-5 py-10 md:grid-cols-[8rem_14rem_1fr] md:gap-10">
              <p className="font-mono text-[0.875rem] uppercase tracking-[0.16em] text-primary">{item.period}</p>
              <div><h2 className="text-2xl font-semibold tracking-tight">{item.company}</h2><p className="mt-2 text-sm text-muted-foreground">{item.role}</p></div>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">Operating principles</p>
          <div className="mt-8 grid border-l border-t border-border md:grid-cols-3">
            {principles.map(([title, copy]) => <article key={title} className="border-b border-r border-border p-7"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{copy}</p></article>)}
          </div>
          <Button className="mt-8" nativeButton={false} render={<Link href="/expertise" />} size="lg">Explore expertise <ArrowRight data-icon="inline-end" /></Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
