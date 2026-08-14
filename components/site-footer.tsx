import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const links = [
  { label: 'Home', href: '/' }, { label: 'Experience', href: '/experience' }, { label: 'Expertise', href: '/expertise' },
  { label: 'Articles', href: '/articles' }, { label: 'Advisory', href: '/advisory' }, { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="font-mono text-lg font-semibold tracking-tight text-foreground">CLOUDOPHILE<span className="text-primary">/</span></p><p className="mt-2 text-xs text-muted-foreground">Enterprise Cloud, Data, AI, and technology leadership.</p></div>
          <div className="flex flex-wrap gap-3"><Button nativeButton={false} render={<Link href="/contact" />}>Start a conversation <ArrowRight data-icon="inline-end" /></Button><Button nativeButton={false} render={<Link href="/articles" />} variant="outline">Explore articles</Button></div>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground" aria-label="Footer navigation">{links.map((link) => <Link key={link.href} href={link.href} className="hover:text-foreground">{link.label}</Link>)}</nav>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Nag Kakarla</p>
        </div>
      </div>
    </footer>
  )
}
