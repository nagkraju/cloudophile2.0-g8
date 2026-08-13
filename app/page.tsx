import { ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { CloudMesh } from '@/components/canvas/CloudMesh'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'

const companies = ['Microsoft', 'AWS', 'Amazon', 'Fidelity', 'Intuit', 'Cisco']

const focusAreas = [
  {
    label: 'Enterprise AI',
    title: 'Agentic systems built for the real enterprise',
    copy: 'From responsible AI strategy to production-grade agent architectures, translating possibility into measurable operating advantage.',
  },
  {
    label: 'Cloud architecture',
    title: 'Modernization without losing operational control',
    copy: 'Multi-cloud platforms, distributed systems, governance, and migration programs designed around resilience and business outcomes.',
  },
  {
    label: 'Executive advisory',
    title: 'Clarity for consequential technology decisions',
    copy: 'Independent guidance for leadership teams navigating AI transformation, platform strategy, and the next phase of scale.',
  },
]

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-border">
      <CloudMesh />
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl items-end px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-5xl">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="block h-px w-10 bg-primary" />
            Cloud · AI · Executive leadership
          </div>
          <h1 className="max-w-5xl text-balance font-sans text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-foreground sm:text-7xl lg:text-8xl">
            Architecting the future of enterprise cloud &amp; <span className="text-gradient">agentic AI.</span>
          </h1>
          <div className="mt-10 flex max-w-4xl flex-col gap-8 border-l border-primary/60 pl-5 sm:pl-7 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Nag Kakarla — Director of Technology, Cloud &amp; AI (EMEA) at Microsoft. Building at the intersection of distributed systems, AI transformation, and executive strategy. Previously AWS, Amazon, Fidelity, Intuit, and Cisco.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button nativeButton={false} render={<Link href="/advisory" />} size="lg">
                Book executive advisory <ArrowRight data-icon="inline-end" />
              </Button>
              <Button nativeButton={false} render={<Link href="/articles" />} size="lg" variant="outline">
                Explore articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <Hero />

      <section id="experience" aria-label="Career experience" className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 lg:grid-cols-[auto_1fr] lg:items-center lg:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Leadership journey</p>
          <ul className="grid grid-cols-3 gap-x-6 gap-y-5 sm:grid-cols-6">
            {companies.map((company) => (
              <li key={company} className="font-sans text-sm font-semibold tracking-tight text-foreground/70">{company}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="expertise" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Where strategy meets systems</p>
            <h2 className="mt-5 text-balance font-sans text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
              Technology leadership for inflection points.
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {focusAreas.map((area) => (
              <article key={area.label} className="group grid gap-4 py-8 sm:grid-cols-[9rem_1fr] sm:py-10">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{area.label}</p>
                <div className="flex flex-col gap-3">
                  <h3 className="text-balance text-xl font-medium tracking-tight text-foreground sm:text-2xl">{area.title}</h3>
                  <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{area.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consulting" className="border-y border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-20 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Executive advisory</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">Make the next technology decision with conviction.</h2>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/advisory" />}
            size="lg"
          >
            Explore advisory <ExternalLink data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </main>
  )
}
