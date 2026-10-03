import { Check } from 'lucide-react'
import type { Metadata } from 'next'

import { AccentedHeading } from '@/components/accented-heading'
import { CloudMesh } from '@/components/canvas/CloudMesh'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getEngagements, getPageContent } from '@/lib/site-content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Executive Advisory', description: 'Independent executive advisory for consequential cloud, AI, platform, and technology transformation decisions.', alternates: { canonical: '/advisory' } }

export default async function AdvisoryPage() {
  const [engagements, content] = await Promise.all([getEngagements(), getPageContent('advisory')])

  return <main><SiteHeader /><section className="relative isolate overflow-hidden border-b border-border"><CloudMesh /><div className="relative mx-auto grid max-w-screen-2xl gap-8 px-4 sm:px-6 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12 text-center lg:px-8 lg:py-20"><div><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p><AccentedHeading className="mt-6 text-balance text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">{content.title}</AccentedHeading></div><p className="text-pretty text-lg leading-relaxed text-muted-foreground">{content.intro}</p></div></section><section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 lg:px-8 lg:py-14"><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-muted-foreground">Ways to work together</p><div className="mt-8 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">{engagements.map((engagement) => <article key={engagement.title} className="flex flex-col gap-8 border-b border-r border-border p-7 sm:p-9"><div className="flex flex-col gap-4"><h2 className="text-2xl font-semibold tracking-[-0.025em]">{engagement.title}</h2><p className="leading-relaxed text-muted-foreground">{engagement.copy}</p></div><ul className="mt-auto flex flex-col gap-3 text-sm text-foreground/80">{engagement.items.map((item) => <li key={item} className="flex items-center gap-3"><Check className="size-4 text-primary" aria-hidden="true" />{item}</li>)}</ul></article>)}</div></section><SiteFooter /></main>
}
