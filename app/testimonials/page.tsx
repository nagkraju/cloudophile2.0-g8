import type { Metadata } from 'next'
import Image from 'next/image'

import { AccentedHeading } from '@/components/accented-heading'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getPageContent, getTestimonials } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Perspectives on Nag Kakarla’s leadership across cloud, enterprise architecture, AI transformation, and executive technology strategy.',
  alternates: { canonical: '/testimonials' },
}

export default async function TestimonialsPage() {
  const [content, testimonials] = await Promise.all([getPageContent('testimonials'), getTestimonials()])

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8 lg:py-28">
            <p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">{content.eyebrow}</p>
            <AccentedHeading className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-7xl">{content.title}</AccentedHeading>
            <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">{content.intro}</p>
          </div>
        </section>

        <section aria-labelledby="testimonial-grid-heading">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
            <h2 id="testimonial-grid-heading" className="sr-only">Testimonials about Nag Kakarla</h2>
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <article key={testimonial.id} className="flex min-h-80 flex-col justify-between gap-10 bg-card p-7 sm:p-9">
                  <blockquote className="text-pretty text-xl font-medium leading-relaxed text-card-foreground sm:text-2xl">
                    <span aria-hidden="true" className="mr-1 text-primary">“</span>
                    {testimonial.quote}
                    <span aria-hidden="true" className="ml-1 text-primary">”</span>
                  </blockquote>
                  <footer className="flex items-center gap-4 border-t border-border pt-6">
                    {testimonial.photoUrl ? (
                      <Image src={testimonial.photoUrl} alt="" width={56} height={56} className="size-14 shrink-0 rounded-full object-cover" unoptimized />
                    ) : (
                      <div className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary font-mono text-sm font-semibold tracking-[0.08em] text-primary" aria-hidden="true">{testimonial.initials}</div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{testimonial.role}{testimonial.organization ? ` · ${testimonial.organization}` : ''}</p>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
