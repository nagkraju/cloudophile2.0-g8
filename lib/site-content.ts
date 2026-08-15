import { TableClient } from '@azure/data-tables'
import { unstable_cache } from 'next/cache'

export const fallbackContent = {
  home: { eyebrow: 'Cloud · Data · AI · Executive leadership', title: 'Architecting the future of enterprise cloud & agentic AI.', intro: 'Nag Kakarla — Director of Technology, Cloud & AI (EMEA) at Microsoft. Building at the intersection of distributed systems, AI transformation, data, and executive strategy.' },
  experience: { eyebrow: 'Experience', title: 'Built across platforms. Proven through transformation.', intro: 'A leadership journey spanning cloud platforms, enterprise architecture, distributed systems, and the decisions that shape technology at scale.' },
  expertise: { eyebrow: 'Expertise', title: 'Deep systems thinking. Clear executive decisions.', intro: 'Technology leadership across enterprise AI, cloud platforms, distributed systems, and transformation programs where architecture and strategy must move together.' },
  testimonials: { eyebrow: 'Testimonials', title: 'Leadership measured by the people and systems it moves forward.', intro: 'Perspectives from colleagues and partners on enterprise transformation, architecture, collaboration, and technology leadership.' },
  articles: { eyebrow: 'Articles & field notes', title: 'Ideas for leaders building through the next technology shift.', intro: 'Perspectives on enterprise AI, cloud architecture, distributed systems, and technology leadership.' },
  advisory: { eyebrow: 'Executive advisory', title: 'Make the next technology decision with conviction.', intro: 'Independent, experience-backed guidance for leadership teams navigating enterprise AI, cloud modernization, platform strategy, transformation, and career inflection points.' },
  contact: { eyebrow: 'Contact', title: 'Let’s make the next decision clearer.', intro: 'Share what you are navigating—an AI strategy, cloud transformation, architecture decision, or leadership challenge. A little context is enough to begin.' },
} as const

export type PageKey = keyof typeof fallbackContent
export type PageContent = { eyebrow: string; title: string; intro: string }

async function loadFromAzure(page: PageKey): Promise<PageContent | null> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  if (!connectionString) return null
  try {
    const client = TableClient.fromConnectionString(connectionString, process.env.AZURE_SITE_CONTENT_TABLE || 'SiteContent')
    const entity = await client.getEntity<Record<string, unknown>>(page, 'hero')
    return { eyebrow: String(entity.eyebrow || fallbackContent[page].eyebrow), title: String(entity.title || fallbackContent[page].title), intro: String(entity.intro || fallbackContent[page].intro) }
  } catch { return null }
}

const getCachedContent = unstable_cache(async (page: PageKey) => loadFromAzure(page), ['site-content'], { revalidate: 300, tags: ['site-content'] })

export async function getPageContent(page: PageKey): Promise<PageContent> {
  return (await getCachedContent(page)) || fallbackContent[page]
}

export type Testimonial = {
  id: string
  name: string
  role: string
  organization: string
  quote: string
  initials: string
  photoUrl?: string
  order: number
}

export const fallbackTestimonials: Testimonial[] = [
  { id: 'transformation', name: 'Alex Morgan', role: 'Chief Technology Officer', organization: 'Global Enterprise', quote: 'Nag brings rare clarity to complex transformation programs. He connects architecture, operating reality, and executive priorities in a way that helps teams move forward with confidence.', initials: 'AM', order: 1 },
  { id: 'platforms', name: 'Priya Shah', role: 'VP, Cloud Platforms', organization: 'Technology Services', quote: 'His systems thinking is matched by a deeply collaborative leadership style. Nag consistently turns ambitious cloud strategy into decisions that engineering teams can execute.', initials: 'PS', order: 2 },
  { id: 'ai', name: 'Daniel Reed', role: 'Head of AI Strategy', organization: 'International Business', quote: 'Nag makes emerging technology practical without reducing its strategic importance. His guidance helped us frame AI investment around measurable enterprise outcomes.', initials: 'DR', order: 3 },
  { id: 'architecture', name: 'Elena Garcia', role: 'Enterprise Architect', organization: 'Financial Services', quote: 'He creates alignment across technical and executive audiences with exceptional precision. The result is architecture that is resilient, understandable, and ready for change.', initials: 'EG', order: 4 },
  { id: 'leadership', name: 'Marcus Lee', role: 'Technology Director', organization: 'Digital Platforms', quote: 'Nag combines high standards with genuine generosity. Teams leave conversations with him sharper, more focused, and more capable of owning the next decision.', initials: 'ML', order: 5 },
  { id: 'advisory', name: 'Sophie Turner', role: 'Managing Partner', organization: 'Transformation Advisory', quote: 'What stands out is his ability to see the whole system: technology, people, risk, and business value. His counsel is thoughtful, direct, and consistently actionable.', initials: 'ST', order: 6 },
]

function stringValue(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function initialsFor(name: string) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'CO'
}

async function loadTestimonialsFromAzure(): Promise<Testimonial[] | null> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  if (!connectionString) return null

  try {
    const client = TableClient.fromConnectionString(connectionString, process.env.AZURE_TESTIMONIALS_TABLE || 'Testimonials')
    const testimonials: Testimonial[] = []
    let index = 0

    for await (const entity of client.listEntities<Record<string, unknown>>()) {
      const fallback = fallbackTestimonials[index % fallbackTestimonials.length]
      const name = stringValue(entity.name, fallback.name)
      testimonials.push({
        id: String(entity.rowKey || entity.id || `testimonial-${index + 1}`),
        name,
        role: stringValue(entity.role, fallback.role),
        organization: stringValue(entity.organization, fallback.organization),
        quote: stringValue(entity.quote, fallback.quote),
        initials: stringValue(entity.initials, initialsFor(name)).slice(0, 3).toUpperCase(),
        photoUrl: typeof entity.photoUrl === 'string' && /^https:\/\//i.test(entity.photoUrl) ? entity.photoUrl : undefined,
        order: Number.isFinite(Number(entity.order)) ? Number(entity.order) : index + 1,
      })
      index += 1
    }

    return testimonials.length ? testimonials.sort((a, b) => a.order - b.order).slice(0, 6) : null
  } catch {
    return null
  }
}

const getCachedTestimonials = unstable_cache(loadTestimonialsFromAzure, ['testimonials'], { revalidate: 300, tags: ['testimonials'] })

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await getCachedTestimonials()) || fallbackTestimonials
}
