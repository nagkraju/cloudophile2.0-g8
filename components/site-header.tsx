'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center gap-4 overflow-x-auto px-5 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="shrink-0 font-mono text-sm font-semibold tracking-tight text-foreground">
          CLOUDOPHILE<span className="text-primary">/</span>
        </Link>
        <div className="flex flex-1 items-center justify-center gap-4 text-[1.0625rem] text-muted-foreground sm:gap-5 lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn('shrink-0 transition-colors hover:text-foreground', isActive && 'text-foreground')}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
