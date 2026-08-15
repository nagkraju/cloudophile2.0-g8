import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CapabilityMotionGrid } from '@/components/capability-motion-grid'
import { CloudMesh } from '@/components/canvas/CloudMesh'
import { CompanyMarquee } from '@/components/company-marquee'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'

const paths = [
  { label: 'Experience', title: 'Leadership forged across the technology stack', copy: 'A journey through cloud, enterprise platforms, distributed systems, and transformation.', href: '/experience' },
  { label: 'Expertise', title: 'Strategy grounded in systems thinking', copy: 'Enterprise AI, cloud platforms, architecture, and operating-model change.', href: '/expertise' },
  { label: 'Advisory', title: 'Independent clarity for consequential decisions', copy: 'Focused guidance for executives navigating technology inflection points.', href: '/advisory' },
]

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section className="relative isolate min-h-[40rem] overflow-hidden border-b border-border">
        <CloudMesh />
        <div className="relative mx-auto flex min-h-[40rem] max-w-7xl items-center px-5 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3 font-mono text-[0.9375rem] uppercase tracking-[0.16em] text-primary">
              <span className="block h-px w-10 bg-primary" />
              <span>Cloud · Data · AI · Executive leadership</span>
              <span className="block h-px w-10 bg-primary" />
            </div>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl">Architecting the future of enterprise cloud &amp; <span className="text-gradient">agentic AI.</span></h1>
            <div className="mt-10 max-w-4xl border-l border-primary/60 pl-5 sm:pl-7">
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">Nag Kakarla — Director of Technology, Cloud &amp; AI (EMEA) at Microsoft. Building at the intersection of distributed systems, AI transformation, data, and executive strategy.</p>
            </div>
          </div>
        </div>
      </section>

      <CompanyMarquee />
      <CapabilityMotionGrid />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Navigate the work</p><h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Technology leadership for inflection points.</h2></div><div className="divide-y divide-border border-y border-border">{paths.map((item) => <article key={item.label} className="grid gap-4 py-8 sm:grid-cols-[8rem_1fr] sm:py-10"><p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{item.label}</p><div className="flex flex-col gap-3"><h3 className="text-balance text-2xl font-medium tracking-tight">{item.title}</h3><p className="max-w-xl leading-relaxed text-muted-foreground">{item.copy}</p><Link href={item.href} className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground">Explore {item.label.toLowerCase()} <ArrowRight className="size-4" aria-hidden="true" /></Link></div></article>)}</div></div>
      </section>
      <section className="border-t border-border"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Continue the conversation</p><h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">Connect beyond the website.</h2></div><Button nativeButton={false} render={<a href="https://linkedin.com/in/nagkraju" target="_blank" rel="noreferrer" />} size="lg">Connect with me on LinkedIn <ArrowRight data-icon="inline-end" /></Button></div></section>
      <SiteFooter />
    </main>
  )
}
