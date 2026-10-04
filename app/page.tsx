import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CapabilityMotionGrid } from '@/components/capability-motion-grid'
import { CloudMesh } from '@/components/canvas/CloudMesh'
import { CompanyMarquee } from '@/components/company-marquee'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { AccentedHeading } from '@/components/accented-heading'
import { getHomePaths, getPageContent, getPageCopy, getMarquee, getSystems } from '@/lib/site-content'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const copy = await getPageCopy('home')
  return { title: copy.metaTitle, description: copy.metaDescription, alternates: { canonical: '/' } }
}

export default async function HomePage() {
  const [paths, content, copy, marquee, systems] = await Promise.all([getHomePaths(), getPageContent('home'), getPageCopy('home'), getMarquee(), getSystems()])
  return (
    <main>
      <SiteHeader />
      <section className="relative isolate overflow-hidden border-b border-border">
        <CloudMesh />
        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 sm:py-14 lg:px-8 lg:py-16">
          <p className="text-center font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p>
          <AccentedHeading className="mx-auto mt-6 max-w-6xl text-balance text-center text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{content.title}</AccentedHeading>
          <p className="mx-auto mt-8 max-w-3xl text-pretty text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">{content.intro}</p>
        </div>
      </section>

      <CompanyMarquee label={copy.marqueeLabel} companies={marquee} />
      <CapabilityMotionGrid eyebrow={copy.systemsEyebrow} title={copy.systemsTitle} items={systems} />

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12"><div><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{copy.pathsEyebrow}</p><h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{copy.pathsTitle}</h2></div><div className="divide-y divide-border border-y border-border">{paths.map((item) => <article key={item.label} className="grid gap-4 py-8 sm:grid-cols-[8rem_1fr] sm:py-10"><p className="font-mono text-[0.875rem] uppercase tracking-[0.16em] text-primary">{item.label}</p><div className="flex flex-col gap-3"><h3 className="text-balance text-2xl font-medium tracking-tight">{item.title}</h3><p className="max-w-xl leading-relaxed text-muted-foreground">{item.copy}</p><Link href={item.href} className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground">{copy.pathsLinkPrefix} {item.label.toLowerCase()} <ArrowRight className="size-4" aria-hidden="true" /></Link></div></article>)}</div></div>
      </section>
      <section className="border-t border-border"><div className="mx-auto flex max-w-screen-2xl flex-col gap-6 px-4 sm:px-6 py-16 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{copy.ctaEyebrow}</p><h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">{copy.ctaTitle}</h2></div><Button nativeButton={false} render={<a href={copy.ctaUrl} target="_blank" rel="noreferrer" />} size="lg">{copy.ctaLabel} <ArrowRight data-icon="inline-end" /></Button></div></section>
      <SiteFooter />
    </main>
  )
}

