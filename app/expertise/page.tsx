import type { Metadata } from 'next'

import { AccentedHeading } from '@/components/accented-heading'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPageContent } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'Enterprise cloud, agentic AI, platform modernization, and executive technology leadership expertise from Nag Kakarla.',
  alternates: { canonical: '/expertise' },
}

const capabilities = [
  {
    eyebrow: '01 / Enterprise AI',
    title: 'Agentic systems that survive contact with the enterprise',
    description: 'Move from compelling demonstrations to governed, observable systems that work across real data, workflows, and operating constraints.',
    outcomes: ['Agent and copilot strategy', 'Responsible AI operating models', 'Production architecture and evaluation'],
  },
  {
    eyebrow: '02 / Cloud platforms',
    title: 'Modernization built around business leverage',
    description: 'Create a platform strategy that balances developer velocity, resilience, security, and cost without trading away operational control.',
    outcomes: ['Multi-cloud and hybrid architecture', 'Platform engineering strategy', 'Migration and modernization roadmaps'],
  },
  {
    eyebrow: '03 / Distributed systems',
    title: 'Architecture for scale, failure, and change',
    description: 'Design systems that remain understandable and dependable as traffic, teams, regions, and regulatory expectations grow.',
    outcomes: ['Resilience and reliability reviews', 'Data and integration architecture', 'Technical due diligence'],
  },
  {
    eyebrow: '04 / Transformation',
    title: 'Aligning technology, operating model, and leadership',
    description: 'Turn broad transformation ambition into explicit decisions, sequenced investments, and measurable business outcomes.',
    outcomes: ['Executive decision frameworks', 'Technology portfolio strategy', 'Organization and capability design'],
  },
]

export default async function ExpertisePage() {
  const content = await getPageContent('expertise')
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
        <div className="divide-y divide-border border-y border-border">
          {capabilities.map((capability) => (
            <article key={capability.eyebrow} className="grid gap-8 py-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-14">
              <p className="font-mono text-[0.875rem] uppercase tracking-[0.16em] text-primary">{capability.eyebrow}</p>
              <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
                <div className="flex flex-col gap-4">
                  <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em]">{capability.title}</h2>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{capability.description}</p>
                </div>
                <ul className="flex flex-col gap-3 border-l border-border pl-5 text-sm text-foreground/80">
                  {capability.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
