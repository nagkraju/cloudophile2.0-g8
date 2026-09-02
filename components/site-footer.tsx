'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

const links = [
  { label: 'Home', href: '/' }, { label: 'Experience', href: '/experience' }, { label: 'Expertise', href: '/expertise' },
  { label: 'Testimonials', href: '/testimonials' }, { label: 'Articles', href: '/articles' }, { label: 'Advisory', href: '/advisory' }, { label: 'Contact', href: '/contact' },
]

const nextPageByPath = Object.fromEntries(links.map((link, index) => [link.href, links[(index + 1) % links.length]]))

export function SiteFooter() {
  const pathname = usePathname()
  const nextPage = nextPageByPath[pathname] || links[0]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div><Link href="/" className="inline-flex" aria-label="Cloudophile home"><Image src="/brands/cloudophile3.png" alt="Cloudophile" width={991} height={123} className="h-auto w-28 object-contain" /></Link><p className="mt-3 text-xs text-muted-foreground">Enterprise Cloud, Data, AI, and technology leadership.</p></div>
          <div className="flex flex-wrap gap-3"><Button nativeButton={false} render={<Link href="/contact" />}>Start a conversation <ArrowRight data-icon="inline-end" /></Button><Button nativeButton={false} render={<Link href={nextPage.href} />} variant="outline">Explore {nextPage.label} <ArrowRight data-icon="inline-end" /></Button></div>
        </div>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground" aria-label="Footer navigation">{links.map((link) => <Link key={link.href} href={link.href} className="hover:text-foreground">{link.label}</Link>)}</nav>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Nag Kakarla</p>
        </div>
      </div>
    </footer>
  )
}
