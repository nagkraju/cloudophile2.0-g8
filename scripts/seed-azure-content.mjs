import { TableClient } from '@azure/data-tables'

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
if (!connectionString) throw new Error('AZURE_STORAGE_CONNECTION_STRING is required')

const tableName = process.env.AZURE_SITE_CONTENT_TABLE || 'SiteContent'
const client = TableClient.fromConnectionString(connectionString, tableName)
await client.createTable().catch((error) => { if (error.statusCode !== 409) throw error })

const pages = {
  home: ['Cloud · Data · AI · Executive leadership', 'Architecting the future of enterprise cloud & agentic AI.', 'Nag Kakarla — Director of Technology, Cloud & AI (EMEA) at Microsoft. Building at the intersection of distributed systems, AI transformation, data, and executive strategy.'],
  experience: ['Experience', 'Built across platforms. Proven through transformation.', 'A leadership journey spanning cloud platforms, enterprise architecture, distributed systems, and the decisions that shape technology at scale.'],
  expertise: ['Expertise', 'Deep systems thinking. Clear executive decisions.', 'Technology leadership across enterprise AI, cloud platforms, distributed systems, and transformation programs where architecture and strategy must move together.'],
  articles: ['Articles & field notes', 'Ideas for leaders building through the next technology shift.', 'Perspectives on enterprise AI, cloud architecture, distributed systems, and technology leadership.'],
  advisory: ['Executive advisory', 'Make the next technology decision with conviction.', 'Independent, experience-backed guidance for leadership teams navigating enterprise AI, cloud modernization, platform strategy, transformation, and career inflection points.'],
  contact: ['Contact', 'Let’s make the next decision clearer.', 'Share what you are navigating—an AI strategy, cloud transformation, architecture decision, or leadership challenge. A little context is enough to begin.'],
}

for (const [page, [eyebrow, title, intro]] of Object.entries(pages)) await client.upsertEntity({ partitionKey: page, rowKey: 'hero', eyebrow, title, intro }, 'Merge')
console.log(`Seeded ${Object.keys(pages).length} page hero records into ${tableName}.`)
