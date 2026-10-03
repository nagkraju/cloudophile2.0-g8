import { CosmosClient } from '@azure/cosmos'
import { fallbackContent, fallbackEngagements, fallbackTestimonials, fallbackPaths, fallbackRoles, fallbackPrinciples, fallbackCapabilities, fallbackArticles, fallbackExpectations } from '../lib/fallback-content'
import type { BaseDocument } from '../src/types/db'

const extras: Record<string, Record<string, unknown>> = {
  advisory: { engagements: fallbackEngagements },
  home: { paths: fallbackPaths },
  experience: { roles: fallbackRoles, principles: fallbackPrinciples },
  expertise: { capabilities: fallbackCapabilities },
  articles: { articles: fallbackArticles },
  contact: { expectations: fallbackExpectations },
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
    ...Object.entries(fallbackContent).map(([slug, data], i): BaseDocument => ({ id: `page-${slug}`, type: 'page', slug, title: data.title, data: { ...data, ...(extras[slug] ?? {}) }, order: i + 1, published: true, updatedAt: now })),
    ...fallbackTestimonials.map((t): BaseDocument => ({ id: `testimonial-${t.id}`, type: 'page', slug: 'testimonial', title: t.name, data: { ...t }, order: t.order, published: true, updatedAt: now })),
  ]

  for (const doc of docs) await container.items.upsert(doc)
  console.log(`Seeded ${docs.length} documents into ${databaseId}/${containerId}.`)
}

main().catch((error) => { console.error(error); process.exit(1) })
