import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPageContent } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Writing and perspectives on enterprise AI, cloud architecture, distributed systems, and technology leadership.',
  alternates: { canonical: '/articles' },
}

const articles = [
  {
    category: 'Agentic AI',
    title: 'The enterprise agent is an operating model, not a chatbot',
    summary: 'Why durable agent adoption depends as much on ownership, controls, and workflow design as it does on model capability.',
    readTime: '8 min read',
  },
  {
    category: 'Cloud strategy',
    title: 'Modernization is a sequence of decisions, not a destination',
    summary: 'A practical framework for separating platform ambition from migration reality and creating measurable progress.',
    readTime: '6 min read',
  },
  {
    category: 'Architecture',
    title: 'Designing for the failure modes your diagram leaves out',
    summary: 'How executive and engineering teams can reason more clearly about resilience across distributed systems.',
    readTime: '10 min read',
  },
  {
    category: 'Leadership',
    title: 'The questions technology leaders should ask before scaling AI',
    summary: 'A decision guide for moving beyond pilots without accumulating governance, data, and architecture debt.',
    readTime: '7 min read',
  },
]

export default async function ArticlesPage() {
  const content = await getPageContent('articles')
  return (
    <main>
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8 lg:py-36">
          <p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p>
          <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">{content.title}</h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{content.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid border-l border-t border-border md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.title} className="group flex min-h-80 flex-col justify-between gap-10 border-b border-r border-border p-7 transition-colors hover:bg-card sm:p-10">
              <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-primary">{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-balance text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{article.title}</h2>
                <p className="text-pretty leading-relaxed text-muted-foreground">{article.summary}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  Discuss this topic <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Full essays are being prepared for publication. In the meantime, connect to discuss any of these themes with Nag.
        </p>
      </section>
      <SiteFooter />
    </main>
  )
}
