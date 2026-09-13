'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { navLinkActiveClass, navLinkClass, navLinks, nextPageByPath } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  const pathname = usePathname()
  const nextPage = nextPageByPath[pathname] || navLinks[0]

  return (
    <footer className="border-t border-border">
      <nav className="mx-auto flex max-w-screen-2xl flex-col items-center gap-4 px-4 py-6 sm:px-6 lg:px-8" aria-label="Footer navigation">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Cloudophile home">
          <Image src="/brands/cloudophile3.png" alt="Cloudophile" width={991} height={123} className="h-auto w-[5.6rem] object-contain sm:w-[7.7rem]" />
        </Link>
        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-medium text-muted-foreground lg:gap-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined} className={cn(navLinkClass, isActive && navLinkActiveClass)}>{link.label}</Link>
          })}
        </div>
      </nav>
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-5 border-t border-border px-4 py-6 text-center sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          <Button nativeButton={false} render={<Link href="/contact" />}>Start a conversation <ArrowRight data-icon="inline-end" /></Button>
          <Button nativeButton={false} render={<Link href={nextPage.href} />} variant="outline">Explore {nextPage.label} <ArrowRight data-icon="inline-end" /></Button>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
          <p>Enterprise Cloud, Data, AI, and technology leadership.</p>
          <p>© {new Date().getFullYear()} <span className="text-gradient font-medium">Nag Kakarla</span></p>
        </div>
      </div>
    </footer>
  )
}
