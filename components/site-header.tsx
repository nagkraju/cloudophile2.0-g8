'use client'

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
      <nav className="mx-auto flex max-w-7xl flex-col px-5 lg:px-8" aria-label="Primary navigation">
        <div className="flex h-16 items-center justify-between gap-5">
          <Link href="/" className="shrink-0 font-mono text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            CLOUDOPHILE<span className="text-primary">/</span>
          </Link>
          <div className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn('transition-colors hover:text-foreground', isActive && 'text-foreground')}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
          <Button nativeButton={false} render={<Link href="/contact" />} size="sm">
            Start a conversation
          </Button>
        </div>
        <div className="flex gap-5 overflow-x-auto border-t border-border py-3 text-sm text-muted-foreground lg:hidden">
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
