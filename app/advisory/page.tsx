import { ArrowUpRight, Check } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Executive Advisory',
  description: 'Independent executive advisory for consequential cloud, AI, platform, and technology transformation decisions.',
  alternates: { canonical: '/advisory' },
}

const engagements = [
  {
    title: 'Executive working session',
    copy: 'A focused session to clarify a consequential decision, challenge assumptions, and establish the next set of actions.',
    items: ['Decision framing', 'Independent perspective', 'Executive-ready action brief'],
  },
  {
    title: 'Architecture and strategy review',
    copy: 'A structured review of AI, cloud, or platform direction against business outcomes, constraints, and operating reality.',
    items: ['Current-state assessment', 'Risk and opportunity analysis', 'Prioritized recommendations'],
  },
  {
    title: 'Ongoing leadership advisory',
    copy: 'A confidential thought partnership for executives leading complex technology transformation over time.',
    items: ['Regular advisory cadence', 'Critical milestone reviews', 'Stakeholder and narrative support'],
  },
]

export default function AdvisoryPage() {
  return (
    <main>
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20 lg:px-8 lg:py-36">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Executive advisory</p>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">
              Make the next technology decision with conviction.
            </h1>
          </div>
          <div className="flex flex-col gap-7 border-l border-primary/60 pl-6">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Independent, experience-backed guidance for leadership teams navigating enterprise AI, cloud modernization, platform strategy, and transformation at scale.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="https://linkedin.com/in/nagkraju" target="_blank" rel="noreferrer" />}
              size="lg"
            >
              Connect on LinkedIn <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Ways to work together</p>
        <div className="mt-8 grid border-l border-t border-border lg:grid-cols-3">
          {engagements.map((engagement) => (
            <article key={engagement.title} className="flex flex-col gap-8 border-b border-r border-border p-7 sm:p-9">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold tracking-[-0.025em]">{engagement.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{engagement.copy}</p>
              </div>
              <ul className="mt-auto flex flex-col gap-3 text-sm text-foreground/80">
                {engagement.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="size-4 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
