import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CloudMesh } from '@/components/canvas/CloudMesh'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'

const companies = ['Microsoft', 'AWS', 'Amazon', 'Fidelity', 'Intuit', 'Cisco']
const paths = [
  { label: 'Experience', title: 'Leadership forged across the technology stack', copy: 'A journey through cloud, enterprise platforms, distributed systems, and transformation.', href: '/experience' },
  { label: 'Expertise', title: 'Strategy grounded in systems thinking', copy: 'Enterprise AI, cloud platforms, architecture, and operating-model change.', href: '/expertise' },
  { label: 'Advisory', title: 'Independent clarity for consequential decisions', copy: 'Focused guidance for executives navigating technology inflection points.', href: '/advisory' },
]

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section className="relative isolate min-h-[calc(100svh-7rem)] overflow-hidden border-b border-border">
        <CloudMesh />
        <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl items-end px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary"><span className="block h-px w-10 bg-primary" />Cloud · AI · Executive leadership</div>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl">Architecting the future of enterprise cloud &amp; <span className="text-gradient">agentic AI.</span></h1>
            <div className="mt-10 flex max-w-4xl flex-col gap-8 border-l border-primary/60 pl-5 sm:pl-7 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">Nag Kakarla — Director of Technology, Cloud &amp; AI (EMEA) at Microsoft. Building at the intersection of distributed systems, AI transformation, and executive strategy.</p>
              <div className="flex shrink-0 flex-wrap gap-3"><Button nativeButton={false} render={<Link href="/contact" />} size="lg">Start a conversation <ArrowRight data-icon="inline-end" /></Button><Button nativeButton={false} render={<Link href="/articles" />} size="lg" variant="outline">Explore articles</Button></div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Career credibility" className="border-b border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 lg:grid-cols-[auto_1fr] lg:items-center lg:px-8"><p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Leadership journey</p><ul className="grid grid-cols-3 gap-x-6 gap-y-5 sm:grid-cols-6">{companies.map((company) => <li key={company} className="text-sm font-semibold tracking-tight text-foreground/70">{company}</li>)}</ul></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Navigate the work</p><h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Technology leadership for inflection points.</h2></div><div className="divide-y divide-border border-y border-border">{paths.map((item) => <article key={item.label} className="grid gap-4 py-8 sm:grid-cols-[8rem_1fr] sm:py-10"><p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{item.label}</p><div className="flex flex-col gap-3"><h3 className="text-balance text-2xl font-medium tracking-tight">{item.title}</h3><p className="max-w-xl leading-relaxed text-muted-foreground">{item.copy}</p><Link href={item.href} className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground">Explore {item.label.toLowerCase()} <ArrowRight className="size-4" aria-hidden="true" /></Link></div></article>)}</div></div>
      </section>
      <SiteFooter />
    </main>
  )
}
