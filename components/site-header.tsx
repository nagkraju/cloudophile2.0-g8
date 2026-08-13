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
      <nav className="mx-auto grid min-h-16 max-w-7xl grid-cols-[auto_1fr] items-center gap-5 px-5 lg:grid-cols-[auto_1fr_auto] lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="shrink-0 font-mono text-sm font-semibold tracking-tight text-foreground">
          CLOUDOPHILE<span className="text-primary">/</span>
        </Link>
        <div className="col-span-2 flex items-center gap-6 overflow-x-auto border-t border-border py-3 text-[1.0625rem] text-muted-foreground lg:col-span-1 lg:justify-center lg:border-0 lg:py-0">
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
        <Link href="/contact" className="hidden font-mono text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground lg:block">
          Let&apos;s talk →
        </Link>
      </nav>
    </header>
  )
}
