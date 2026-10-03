export type DocumentType = 'page' | 'navigation' | 'project' | 'setting'

export interface BaseDocument {
  id: string
  type: DocumentType // partition key (/type)
  slug?: string
  title?: string
  data: Record<string, any>
  order?: number
  published: boolean
  updatedAt: string
}

export interface PageHeroData {
  eyebrow: string
  title: string
  intro: string
  [key: string]: any
}

export interface TestimonialData {
  id: string
  name: string
  role: string
  organization: string
  quote: string
  initials: string
  photoUrl?: string
  order: number
}

export interface EngagementData {
  title: string
  copy: string
  items: string[]
}
