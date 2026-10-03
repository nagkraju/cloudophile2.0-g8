export const fallbackContent = {
  home: { eyebrow: 'Cloud · Data · AI · Executive leadership', title: 'Architecting the future of enterprise cloud & agentic AI.', intro: 'Nag Kakarla — Director of Technology, Cloud & AI (EMEA) at Microsoft. Building at the intersection of distributed systems, AI transformation, data, and executive strategy.' },
  experience: { eyebrow: 'Experience', title: 'Built across platforms. Proven through transformation.', intro: 'A leadership journey spanning cloud platforms, enterprise architecture, distributed systems, and the decisions that shape technology at scale.' },
  expertise: { eyebrow: 'Expertise', title: 'Deep systems thinking. Clear executive decisions.', intro: 'Technology leadership across enterprise AI, cloud platforms, distributed systems, and transformation programs where architecture and strategy must move together.' },
  testimonials: { eyebrow: 'Testimonials', title: 'Leadership measured by the people and systems it moves forward.', intro: 'Perspectives from colleagues and partners on enterprise transformation, architecture, collaboration, and technology leadership.' },
  articles: { eyebrow: 'Articles & field notes', title: 'Ideas for leaders building through the next technology shift.', intro: 'Perspectives on enterprise AI, cloud architecture, distributed systems, and technology leadership.' },
  advisory: { eyebrow: 'Executive advisory', title: 'Make the next technology decision with conviction.', intro: 'Independent, experience-backed guidance for leadership teams navigating enterprise AI, cloud modernization, platform strategy, transformation, and career inflection points.' },
  contact: { eyebrow: 'Contact', title: 'Let’s make the next decision clearer.', intro: 'Share what you are navigating—an AI strategy, cloud transformation, architecture decision, or leadership challenge. A little context is enough to begin.' },
} as const

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


export type Engagement = { title: string; copy: string; items: string[] }

export const fallbackEngagements: Engagement[] = [
  { title: 'Executive working session', copy: 'A focused session to clarify a consequential decision, challenge assumptions, and establish the next set of actions.', items: ['Decision framing', 'Independent perspective', 'Executive-ready action brief'] },
  { title: 'Architecture and strategy review', copy: 'A structured review of AI, cloud, or platform direction against business outcomes, constraints, and operating reality.', items: ['Current-state assessment', 'Risk and opportunity analysis', 'Prioritized recommendations'] },
  { title: 'Ongoing leadership advisory', copy: 'A confidential thought partnership for executives leading complex technology transformation over time.', items: ['Regular advisory cadence', 'Critical milestone reviews', 'Stakeholder and narrative support'] },
  { title: 'Career coaching, mentoring & resume writing', copy: 'Practical, individualized support to sharpen your leadership story, career choices, and executive-ready resume.', items: ['Career direction', 'Leadership narrative', 'Resume review and rewrite'] },
  { title: 'Big Tech interview preparation', copy: 'Focused preparation for architecture, leadership, and behavioral interviews grounded in how Big Tech evaluates senior candidates.', items: ['Interview strategy', 'Architecture practice', 'Behavioral story coaching'] },
  { title: 'Speaking or leadership session', copy: 'Engaging keynotes and leadership sessions informed by many public speaking engagements, executive forums, and technology keynotes.', items: ['Keynotes and panels', 'Executive leadership sessions', 'Cloud and AI themes'] },
]



export const fallbackPaths = [
  { label: 'Experience', title: 'Leadership forged across the technology stack', copy: 'A journey through cloud, enterprise platforms, distributed systems, and transformation.', href: '/experience' },
  { label: 'Expertise', title: 'Strategy grounded in systems thinking', copy: 'Enterprise AI, cloud platforms, architecture, and operating-model change.', href: '/expertise' },
  { label: 'Advisory', title: 'Independent clarity for consequential decisions', copy: 'Focused guidance for executives navigating technology inflection points.', href: '/advisory' },
]

export const fallbackRoles = [
  { period: 'Now', company: 'Microsoft', role: 'Director of Technology, Cloud & AI — EMEA', copy: 'Partnering with enterprise leaders to shape cloud, AI, and platform strategies that move from ambition to production.' },
  { period: 'Previously', company: 'AWS & Amazon', role: 'Cloud and technology leadership', copy: 'Led complex architecture and transformation conversations where scale, resilience, and business outcomes had to move together.' },
  { period: 'Foundation', company: 'Fidelity · Intuit · Cisco', role: 'Enterprise platforms and distributed systems', copy: 'Built deep operating experience across financial services, software platforms, infrastructure, and globally distributed systems.' },
]

export const fallbackPrinciples: [string, string][] = [
  ['Start with the decision', 'Make the business and operating decision explicit before choosing technology.'],
  ['Design for reality', 'Architecture must account for people, controls, failure modes, and change—not only the ideal state.'],
  ['Create durable leverage', 'Invest in platforms and capabilities that compound beyond a single program or migration.'],
]

export const fallbackCapabilities = [
  {
    eyebrow: '01 / Enterprise AI',
    title: 'Agentic systems that survive contact with the enterprise',
    description: 'Move from compelling demonstrations to governed, observable systems that work across real data, workflows, and operating constraints.',
    outcomes: ['Agent and copilot strategy', 'Responsible AI operating models', 'Production architecture and evaluation'],
  },
  {
    eyebrow: '02 / Cloud platforms',
    title: 'Modernization built around business leverage',
    description: 'Create a platform strategy that balances developer velocity, resilience, security, and cost without trading away operational control.',
    outcomes: ['Multi-cloud and hybrid architecture', 'Platform engineering strategy', 'Migration and modernization roadmaps'],
  },
  {
    eyebrow: '03 / Distributed systems',
    title: 'Architecture for scale, failure, and change',
    description: 'Design systems that remain understandable and dependable as traffic, teams, regions, and regulatory expectations grow.',
    outcomes: ['Resilience and reliability reviews', 'Data and integration architecture', 'Technical due diligence'],
  },
  {
    eyebrow: '04 / Transformation',
    title: 'Aligning technology, operating model, and leadership',
    description: 'Turn broad transformation ambition into explicit decisions, sequenced investments, and measurable business outcomes.',
    outcomes: ['Executive decision frameworks', 'Technology portfolio strategy', 'Organization and capability design'],
  },
]

export const fallbackArticles = [
  {
    category: 'Agentic AI',
    title: 'The enterprise agent is an operating model, not a chatbot',
    summary: 'Why durable agent adoption depends as much on ownership, controls, and workflow design as it does on model capability.',
    readTime: '8 min read',
  },
  {
    category: 'Cloud strategy',
    title: 'Modernization is a sequence of decisions, not a destination',
    summary: 'A practical framework for separating platform ambition from migration reality and creating measurable progress.',
    readTime: '6 min read',
  },
  {
    category: 'Architecture',
    title: 'Designing for the failure modes your diagram leaves out',
    summary: 'How executive and engineering teams can reason more clearly about resilience across distributed systems.',
    readTime: '10 min read',
  },
  {
    category: 'Leadership',
    title: 'The questions technology leaders should ask before scaling AI',
    summary: 'A decision guide for moving beyond pilots without accumulating governance, data, and architecture debt.',
    readTime: '7 min read',
  },
]

export const fallbackExpectations = [
  { icon: 'clock', title: 'A considered response', copy: 'Expect a personal reply, typically within two business days.' },
  { icon: 'shield', title: 'Confidential by default', copy: 'Your context is used only to understand and respond to your inquiry.' },
  { icon: 'mail', title: 'Direct conversation', copy: 'No sales sequence. No newsletter enrollment. Just a useful first exchange.' },
]

