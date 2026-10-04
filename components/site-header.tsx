import { SiteHeaderClient } from '@/components/site-header-client'
import { getNavigation, getSiteSettings } from '@/lib/site-content'

export async function SiteHeader() {
  const [links, site] = await Promise.all([getNavigation(), getSiteSettings()])
  return <SiteHeaderClient links={links} ctaLabel={site.headerCtaLabel} ctaHref={site.headerCtaHref} />
}
