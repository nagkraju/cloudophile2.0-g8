import type { MetadataRoute } from 'next'

import { siteUrl } from '@/lib/site-url'

const routes = ['', '/experience', '/expertise', '/advisory', '/testimonials', '/articles', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
