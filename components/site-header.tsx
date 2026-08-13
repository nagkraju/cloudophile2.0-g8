'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Expertise', href: '/expertise' },
  { label: 'Articles', href: '/articles' },
  { label: 'Advisory', href: '/advisory' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          CLOUDOPHILE<span className="text-primary">/</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'transition-colors hover:text-foreground',
                  isActive && 'text-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
        <Button nativeButton={false} render={<Link href="/advisory" />} size="sm">
          Start a conversation
        </Button>
      </nav>
    </header>
  )
}
