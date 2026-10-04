import { getContentContainer } from '@/lib/cosmos'
import { fallbackContent, fallbackEngagements, fallbackTestimonials, fallbackPaths, fallbackRoles, fallbackPrinciples, fallbackCapabilities, fallbackArticles, fallbackExpectations, fallbackCopy, fallbackSite, fallbackNav, fallbackMarquee, fallbackSystems, fallbackForm, type FormCopy, type Engagement, type Testimonial } from '@/lib/fallback-content'
import type { BaseDocument } from '@/src/types/db'
import { unstable_cache } from 'next/cache'

export { fallbackContent, fallbackTestimonials }
export type { Testimonial }
export type PageKey = keyof typeof fallbackContent
export type PageContent = { eyebrow: string; title: string; intro: string }

async function loadFromAzure(page: PageKey): Promise<PageContent | null> {
  const container = getContentContainer()
  if (!container) return null
  try {
    const { resource } = await container.item(`page-${page}`, 'page').read<BaseDocument>()
    if (!resource || !resource.published) return null
    const d = resource.data || {}
    const f = fallbackContent[page]
    return { eyebrow: String(d.eyebrow || f.eyebrow), title: String(d.title || f.title), intro: String(d.intro || f.intro) }
  } catch { return null }
}
const getCachedContent = unstable_cache(async (page: PageKey) => loadFromAzure(page), ['site-content'], { revalidate: 300, tags: ['site-content'] })

export async function getPageContent(page: PageKey): Promise<PageContent> {
  return (await getCachedContent(page)) || fallbackContent[page]
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function initialsFor(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'CO'
}

async function loadTestimonialsFromAzure(): Promise<Testimonial[] | null> {
  const container = getContentContainer()
  if (!container) return null
  try {
    const { resources } = await container.items
      .query<BaseDocument>({ query: "SELECT * FROM c WHERE c.type = 'page' AND c.slug = 'testimonial' AND c.published = true" }, { partitionKey: 'page' })
      .fetchAll()
    const testimonials: Testimonial[] = resources.map((doc, index) => {
      const entity = doc.data || {}
      const fallback = fallbackTestimonials[index % fallbackTestimonials.length]
      const name = stringValue(entity.name, fallback.name)
      return {
        id: doc.id,
        name,
        role: stringValue(entity.role, fallback.role),
        organization: stringValue(entity.organization, fallback.organization),
        quote: stringValue(entity.quote, fallback.quote),
        initials: stringValue(entity.initials, initialsFor(name)).slice(0, 3).toUpperCase(),
        photoUrl: typeof entity.photoUrl === 'string' && /^https:\/\//i.test(entity.photoUrl) ? entity.photoUrl : undefined,
        order: Number.isFinite(Number(doc.order)) ? Number(doc.order) : index + 1,
      }
    })
    return testimonials.length ? testimonials.sort((a, b) => a.order - b.order).slice(0, 6) : null
  } catch {
    return null
  }
}
const getCachedTestimonials = unstable_cache(loadTestimonialsFromAzure, ['testimonials'], { revalidate: 300, tags: ['testimonials'] })

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await getCachedTestimonials()) || fallbackTestimonials
}

async function loadEngagementsFromAzure(): Promise<Engagement[] | null> {
  const container = getContentContainer()
  if (!container) return null
  try {
    const { resource } = await container.item('page-advisory', 'page').read<BaseDocument>()
    const list = resource?.published ? resource.data?.engagements : null
    return Array.isArray(list) && list.length ? (list as Engagement[]) : null
  } catch {
    return null
  }
}

const getCachedEngagements = unstable_cache(async () => (await loadEngagementsFromAzure()) ?? fallbackEngagements, ['advisory-engagements'], { revalidate: 300, tags: ['site-content'] })

export async function getEngagements(): Promise<Engagement[]> {
  try {
    return await getCachedEngagements()
  } catch {
    return fallbackEngagements
  }
}

function makeListLoader<T>(slug: string, key: string, fallback: T[]) {
  const load = async (): Promise<T[]> => {
    const container = getContentContainer()
    if (!container) return fallback
    try {
      const { resource } = await container.item(`page-${slug}`, 'page').read<BaseDocument>()
      const list = resource?.published ? resource.data?.[key] : null
      return Array.isArray(list) && list.length ? (list as T[]) : fallback
    } catch {
      return fallback
    }
  }
  const cached = unstable_cache(load, [`list-${slug}-${key}`], { revalidate: 300, tags: ['site-content'] })
  return async () => {
    try {
      return await cached()
    } catch {
      return fallback
    }
  }
}

export const getHomePaths = makeListLoader('home', 'paths', fallbackPaths)
export const getExperienceRoles = makeListLoader('experience', 'roles', fallbackRoles)
export const getExperiencePrinciples = makeListLoader('experience', 'principles', fallbackPrinciples)
export const getCapabilities = makeListLoader('expertise', 'capabilities', fallbackCapabilities)
export const getArticles = makeListLoader('articles', 'articles', fallbackArticles)
export const getContactExpectations = makeListLoader('contact', 'expectations', fallbackExpectations)

async function readDoc(id: string, partition: string): Promise<BaseDocument | null> {
  const container = getContentContainer()
  if (!container) return null
  try {
    const { resource } = await container.item(id, partition).read<BaseDocument>()
    return resource?.published ? resource : null
  } catch {
    return null
  }
}

function cleanStrings(source: unknown, fallback: Record<string, string>): Record<string, string> {
  const raw = source && typeof source === 'object' ? (source as Record<string, unknown>) : {}
  const out: Record<string, string> = {}
  for (const key of Object.keys(fallback)) out[key] = stringValue(raw[key], fallback[key])
  return out
}

const cachedPageData = unstable_cache(async (slug: string) => (await readDoc(`page-${slug}`, 'page'))?.data ?? null, ['page-data'], { revalidate: 300, tags: ['site-content'] })

async function pageData(slug: string): Promise<Record<string, unknown> | null> {
  try { return await cachedPageData(slug) } catch { return null }
}

// Section labels, link text and metadata for a page (data.copy), with per-field fallbacks.
export async function getPageCopy(slug: keyof typeof fallbackCopy) {
  const data = await pageData(slug)
  return cleanStrings(data?.copy, fallbackCopy[slug])
}

export async function getMarquee() {
  const data = await pageData('home')
  const m = data?.marquee
  return Array.isArray(m) && m.length ? (m as { name: string; src: string }[]) : fallbackMarquee
}

export async function getSystems() {
  const data = await pageData('home')
  const s = data?.systems
  return Array.isArray(s) && s.length ? (s as { label: string; copy: string; kind: string }[]) : fallbackSystems
}

export async function getContactForm(): Promise<FormCopy> {
  const data = await pageData('contact')
  const raw = (data?.form && typeof data.form === 'object' ? data.form : {}) as Record<string, unknown>
  const { topics, ...strings } = fallbackForm
  const merged = cleanStrings(raw, strings as Record<string, string>)
  const t = raw.topics
  return { ...(merged as Omit<FormCopy, 'topics'>), topics: Array.isArray(t) && t.length ? (t as FormCopy['topics']) : topics }
}

const cachedSite = unstable_cache(async () => (await readDoc('setting-site', 'setting'))?.data ?? null, ['setting-site'], { revalidate: 300, tags: ['site-content'] })
export async function getSiteSettings() {
  let data: Record<string, unknown> | null = null
  try { data = await cachedSite() } catch {}
  return cleanStrings(data, fallbackSite)
}

const cachedNav = unstable_cache(async () => (await readDoc('navigation-main', 'navigation'))?.data?.links ?? null, ['navigation-main'], { revalidate: 300, tags: ['site-content'] })
export async function getNavigation() {
  try {
    const links = await cachedNav()
    if (Array.isArray(links) && links.length && links.every((l) => l && typeof l.label === 'string' && typeof l.href === 'string')) {
      return (links as { label: string; href: string }[]).map((link) => link.href === '/articles' ? { ...link, label: 'Insights' } : link)
    }
  } catch {}
  return fallbackNav
}
