import type { Metadata } from 'next'

import { AccentedHeading } from '@/components/accented-heading'
import { CloudMesh } from '@/components/canvas/CloudMesh'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getCapabilities, getPageContent, getPageCopy } from '@/lib/site-content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'Enterprise cloud, agentic AI, platform modernization, and executive technology leadership expertise from Nag Kakarla.',
  alternates: { canonical: '/expertise' },
}

export default async function ExpertisePage() {
  const content = await getPageContent('expertise')
  const capabilities = await getCapabilities()
  return (
    <main>
      <SiteHeader />
      <section className="relative isolate overflow-hidden border-b border-border">
        <CloudMesh />
        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-center font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p>
          <AccentedHeading className="mx-auto mt-6 max-w-5xl text-balance text-center text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">{content.title}</AccentedHeading>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">{content.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 lg:px-8 lg:py-16">
        <div className="divide-y divide-border border-y border-border">
          {capabilities.map((capability) => (
            <article key={capability.eyebrow} className="grid gap-8 py-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12 lg:py-14">
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


