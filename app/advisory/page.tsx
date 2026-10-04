import { Check } from 'lucide-react'
import type { Metadata } from 'next'

import { AccentedHeading } from '@/components/accented-heading'
import { CloudMesh } from '@/components/canvas/CloudMesh'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getEngagements, getPageContent, getPageCopy } from '@/lib/site-content'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy('advisory')
  return { title: copy.metaTitle, description: copy.metaDescription, alternates: { canonical: '/advisory' } }
}

export default async function AdvisoryPage() {
  const [engagements, content, copy] = await Promise.all([getEngagements(), getPageContent('advisory'), getPageCopy('advisory')])

  return <main><SiteHeader /><section className="relative isolate overflow-hidden border-b border-border"><CloudMesh /><div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 sm:py-14 text-center lg:px-8 lg:py-16"><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p><AccentedHeading className="mx-auto mt-6 max-w-6xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{content.title}</AccentedHeading><p className="mx-auto mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">{content.intro}</p></div></section><section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 lg:px-8 lg:py-14"><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-muted-foreground">{copy.engagementsLabel}</p><div className="mt-8 grid border-l border-t border-border md:grid-cols-2 lg:grid-cols-3">{engagements.map((engagement) => <article key={engagement.title} className="flex flex-col gap-8 border-b border-r border-border p-7 sm:p-9"><div className="flex flex-col gap-4"><h2 className="text-2xl font-semibold tracking-[-0.025em]">{engagement.title}</h2><p className="leading-relaxed text-muted-foreground">{engagement.copy}</p></div><ul className="mt-auto flex flex-col gap-3 text-sm text-foreground/80">{engagement.items.map((item) => <li key={item} className="flex items-center gap-3"><Check className="size-4 text-primary" aria-hidden="true" />{item}</li>)}</ul></article>)}</div></section><SiteFooter /></main>
}



