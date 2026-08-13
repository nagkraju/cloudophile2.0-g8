import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="font-mono font-semibold text-foreground">
          CLOUDOPHILE<span className="text-primary">/</span>
        </Link>
        <p>Enterprise cloud, AI, and technology leadership.</p>
        <p>© {new Date().getFullYear()} Nag Kakarla</p>
      </div>
    </footer>
  )
}
