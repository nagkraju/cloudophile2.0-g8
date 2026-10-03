import 'server-only'
import { CosmosClient, type Container } from '@azure/cosmos'

const DATABASE = process.env.COSMOS_DATABASE || 'cloudophile'
const CONTAINER = process.env.COSMOS_CONTAINER || 'content'

const globalForCosmos = globalThis as unknown as { __cosmosClient?: CosmosClient | null }

function getClient(): CosmosClient | null {
  if (globalForCosmos.__cosmosClient !== undefined) return globalForCosmos.__cosmosClient
  const connectionString = process.env.COSMOS_CONNECTION_STRING
  const endpoint = process.env.COSMOS_ENDPOINT
  const key = process.env.COSMOS_KEY
  globalForCosmos.__cosmosClient = connectionString
    ? new CosmosClient(connectionString)
    : endpoint && key
      ? new CosmosClient({ endpoint, key })
      : null
  return globalForCosmos.__cosmosClient
}

/** Returns the content container, or null when Cosmos is not configured. */
export function getContentContainer(): Container | null {
  return getClient()?.database(DATABASE).container(CONTAINER) ?? null
}

export const cosmosConfig = { database: DATABASE, container: CONTAINER }
