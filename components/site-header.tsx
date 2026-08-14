'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Articles', href: '/articles' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto grid min-h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Cloudophile home">
          <Image src="/brands/cloudophile-mark.svg" alt="Cloudophile" width={360} height={132} priority className="h-auto w-24 object-contain sm:w-28" />
        </Link>
        <div className="flex min-w-0 items-center justify-center gap-4 overflow-x-auto text-sm font-medium text-muted-foreground lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined} className={cn('shrink-0 border-b-2 border-transparent py-2 transition-colors hover:text-foreground', isActive && 'border-primary text-foreground')}>{link.label}</Link>
          })}
        </div>
        <Button nativeButton={false} render={<Link href="/contact" />} size="sm" className="hidden shrink-0 sm:inline-flex">Start a conversation <ArrowRight data-icon="inline-end" /></Button>
      </nav>
    </header>
  )
}
