import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Articles', href: '/articles' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-mono font-semibold text-foreground">
            CLOUDOPHILE<span className="text-primary">/</span>
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground" aria-label="Footer navigation">
            {links.map((link) => <Link key={link.href} href={link.href} className="hover:text-foreground">{link.label}</Link>)}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>Enterprise cloud, AI, and technology leadership.</p>
          <p>© {new Date().getFullYear()} Nag Kakarla</p>
        </div>
      </div>
    </footer>
  )
}
