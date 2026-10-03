'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { navGridClass, navLinkActiveClass, navLinkClass, navLinks, navListClass } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className={navGridClass} aria-label="Primary navigation">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Cloudophile home">
          <Image src="/brands/cloudophile3.png" alt="Cloudophile" width={991} height={123} priority className="h-auto w-32 object-contain sm:w-44" />
        </Link>
        <div className={navListClass}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined} className={cn(navLinkClass, isActive && navLinkActiveClass)}>{link.label}</Link>
          })}
        </div>
        <Button nativeButton={false} render={<Link href="/contact" />} size="sm" className="hidden shrink-0 lg:inline-flex">Start a conversation <ArrowRight data-icon="inline-end" /></Button>
      </nav>
    </header>
  )
}
