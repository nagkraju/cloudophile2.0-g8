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
      <nav className="mx-auto grid min-h-20 max-w-screen-2xl grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6 sm:py-0 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Cloudophile home">
          <Image src="/brands/cloudophile3.png" alt="Cloudophile" width={991} height={123} priority className="h-auto w-32 object-contain sm:w-44" />
        </Link>
        <div className="col-span-3 row-start-2 flex min-w-0 items-center justify-start gap-4 overflow-x-auto text-sm font-medium text-muted-foreground sm:col-span-1 sm:row-start-auto sm:justify-center lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined} className={cn('shrink-0 border-b-2 border-transparent py-2 transition-colors hover:text-foreground', isActive && 'border-primary text-foreground')}>{link.label}</Link>
          })}
        </div>
        <Button nativeButton={false} render={<Link href="/contact" />} size="sm" className="hidden shrink-0 lg:inline-flex">Start a conversation <ArrowRight data-icon="inline-end" /></Button>
      </nav>
    </header>
  )
}
