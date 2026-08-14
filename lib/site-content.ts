import { TableClient } from '@azure/data-tables'
import { unstable_cache } from 'next/cache'

export const fallbackContent = {
  home: { eyebrow: 'Cloud · Data · AI · Executive leadership', title: 'Architecting the future of enterprise cloud & agentic AI.', intro: 'Nag Kakarla — Director of Technology, Cloud & AI (EMEA) at Microsoft. Building at the intersection of distributed systems, AI transformation, data, and executive strategy.' },
  experience: { eyebrow: 'Experience', title: 'Built across platforms. Proven through transformation.', intro: 'A leadership journey spanning cloud platforms, enterprise architecture, distributed systems, and the decisions that shape technology at scale.' },
  expertise: { eyebrow: 'Expertise', title: 'Deep systems thinking. Clear executive decisions.', intro: 'Technology leadership across enterprise AI, cloud platforms, distributed systems, and transformation programs where architecture and strategy must move together.' },
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
