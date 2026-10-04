import { CosmosClient } from '@azure/cosmos'
import { fallbackContent, fallbackEngagements, fallbackTestimonials, fallbackPaths, fallbackRoles, fallbackPrinciples, fallbackCapabilities, fallbackArticles, fallbackExpectations, fallbackCopy, fallbackSite, fallbackNav, fallbackMarquee, fallbackSystems, fallbackForm } from '../lib/fallback-content'
import type { BaseDocument } from '../src/types/db'

const extras: Record<string, Record<string, unknown>> = {
  advisory: { engagements: fallbackEngagements },
  home: { paths: fallbackPaths, marquee: fallbackMarquee, systems: fallbackSystems },
  experience: { roles: fallbackRoles, principles: fallbackPrinciples },
  expertise: { capabilities: fallbackCapabilities },
  articles: { articles: fallbackArticles },
  contact: { expectations: fallbackExpectations, form: fallbackForm },
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
// Existing values win so edits made in Cosmos are never overwritten.
function merge(defaults: Record<string, unknown>, existing: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...defaults }
  for (const [k, v] of Object.entries(existing)) out[k] = isObj(v) && isObj(defaults[k]) ? merge(defaults[k] as Record<string, unknown>, v) : v
  return out
}

const connectionString = process.env.COSMOS_CONNECTION_STRING
const endpoint = process.env.COSMOS_ENDPOINT
const key = process.env.COSMOS_KEY
const databaseId = process.env.COSMOS_DATABASE || 'cloudophile'
const containerId = process.env.COSMOS_CONTAINER || 'content'

async function main() {
  const client = connectionString ? new CosmosClient(connectionString) : endpoint && key ? new CosmosClient({ endpoint, key }) : null
  if (!client) throw new Error('Set COSMOS_CONNECTION_STRING or COSMOS_ENDPOINT + COSMOS_KEY')

  const { database } = await client.databases.createIfNotExists({ id: databaseId })
  const { container } = await database.containers.createIfNotExists({ id: containerId, partitionKey: { paths: ['/type'] } })
  const now = new Date().toISOString()

  const docs: BaseDocument[] = [
    ...Object.entries(fallbackContent).map(([slug, data], i): BaseDocument => ({ id: `page-${slug}`, type: 'page', slug, title: data.title, data: { ...data, ...(extras[slug] ?? {}), copy: fallbackCopy[slug] ?? {} }, order: i + 1, published: true, updatedAt: now })),
    ...fallbackTestimonials.map((t): BaseDocument => ({ id: `testimonial-${t.id}`, type: 'page', slug: 'testimonial', title: t.name, data: { ...t }, order: t.order, published: true, updatedAt: now })),
    { id: 'setting-site', type: 'setting', slug: 'site', title: 'Site settings', data: { ...fallbackSite }, published: true, updatedAt: now },
    { id: 'navigation-main', type: 'navigation', slug: 'main', title: 'Main navigation', data: { links: fallbackNav }, published: true, updatedAt: now },
  ]

  for (const doc of docs) {
    const { resource } = await container.item(doc.id, doc.type).read<BaseDocument>()
    await container.items.upsert(resource ? { ...doc, ...resource, data: merge(doc.data, resource.data ?? {}), updatedAt: now } : doc)
  }
  console.log(`Seeded ${docs.length} documents into ${databaseId}/${containerId}.`)
}

main().catch((error) => { console.error(error); process.exit(1) })



