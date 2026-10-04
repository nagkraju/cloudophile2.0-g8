import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { AccentedHeading } from '@/components/accented-heading'
import { CloudMesh } from '@/components/canvas/CloudMesh'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getArticles, getPageContent, getPageCopy } from '@/lib/site-content'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('articles')
  return {
    title: 'Insights',
    description: content.intro,
    alternates: { canonical: '/articles' },
  }
}

export default async function ArticlesPage() {
  const [content, copy] = await Promise.all([getPageContent('articles'), getPageCopy('articles')])
  const articles = await getArticles()
  return (
    <main>
      <SiteHeader />
      <section className="relative isolate overflow-hidden border-b border-border">
        <CloudMesh />
        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-center font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">Insights &amp; field notes</p>
          <AccentedHeading className="mx-auto mt-6 max-w-6xl text-balance text-center text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{content.title}</AccentedHeading>
          <p className="mx-auto mt-8 max-w-3xl text-pretty text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">{content.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid border-l border-t border-border md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.title} className="group flex min-h-80 flex-col justify-between gap-10 border-b border-r border-border p-7 transition-colors hover:bg-card sm:p-10">
              <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-primary">{article.category}</span>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-balance text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{article.title}</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">{article.summary}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {copy.cardLink} <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
