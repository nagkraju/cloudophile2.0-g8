import { SiteFooterClient } from '@/components/site-footer-client'
import { getNavigation, getSiteSettings } from '@/lib/site-content'

export async function SiteFooter() {
  const [links, site] = await Promise.all([getNavigation(), getSiteSettings()])
  return <SiteFooterClient links={links} tagline={site.tagline} ownerName={site.ownerName} explorePrefix={site.footerExplorePrefix} />
}
