'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { navGridClass, navLinkActiveClass, navLinkClass, navLinks, navListClass, nextPageByPath } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  const pathname = usePathname()
  const nextPage = nextPageByPath[pathname] || navLinks[0]

  return (
    <footer className="border-t border-border">
      <nav className={cn(navGridClass, 'border-b border-border')} aria-label="Footer navigation">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Cloudophile home">
          <Image src="/brands/cloudophile3.png" alt="Cloudophile" width={991} height={123} className="h-auto w-32 object-contain sm:w-44" />
        </Link>
        <div className={navListClass}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined} className={cn(navLinkClass, isActive && navLinkActiveClass)}>{link.label}</Link>
          })}
        </div>
        <Button nativeButton={false} render={<Link href="/contact" />} size="sm" className="hidden shrink-0 lg:inline-flex">Start a conversation <ArrowRight data-icon="inline-end" /></Button>
      </nav>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <p>Enterprise Cloud, Data, AI, and technology leadership.</p>
          <p>© {new Date().getFullYear()} <span className="text-gradient font-medium">Nag Kakarla</span></p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button nativeButton={false} render={<Link href="/contact" />} className="lg:hidden">Start a conversation <ArrowRight data-icon="inline-end" /></Button>
          <Button nativeButton={false} render={<Link href={nextPage.href} />} variant="outline">Explore {nextPage.label} <ArrowRight data-icon="inline-end" /></Button>
        </div>
      </div>
    </footer>
  )
}
