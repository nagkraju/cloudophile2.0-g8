import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const siteUrl = 'https://cloudophile.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nag Kakarla — Enterprise Cloud & AI Executive',
    template: '%s | Cloudophile',
  },
  description: 'Executive technology leader and advisor helping enterprises navigate cloud modernization, generative AI transformation, and agentic systems.',
  keywords: ['Nag Kakarla', 'Cloudophile', 'enterprise AI', 'agentic AI', 'cloud architecture', 'technology executive'],
  authors: [{ name: 'Nag Kakarla', url: siteUrl }],
  creator: 'Nag Kakarla',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Cloudophile',
    title: 'Nag Kakarla — Enterprise Cloud & AI Executive',
    description: 'Architecting the future of enterprise cloud and agentic AI.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nag Kakarla — Enterprise Cloud & AI Executive',
    description: 'Architecting the future of enterprise cloud and agentic AI.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#141414',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Nag Kakarla',
      url: siteUrl,
      jobTitle: 'Director of Technology, Cloud & AI (EMEA)',
      worksFor: { '@type': 'Organization', name: 'Microsoft' },
      sameAs: ['https://linkedin.com/in/nagkraju', 'https://github.com/nagkraju'],
      knowsAbout: ['Enterprise Cloud Architecture', 'Generative AI', 'Agentic AI Systems', 'Distributed Computing'],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Cloudophile',
      url: siteUrl,
      founder: { '@id': `${siteUrl}/#person` },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark bg-background ${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
