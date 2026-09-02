import { BrainCircuit, Database, Network } from 'lucide-react'

import { CloudophileCloud } from '@/components/icons/cloudophile-cloud'

const capabilities = [
  { label: 'Cloud', copy: 'Platforms that scale with the enterprise.', icon: CloudophileCloud, kind: 'cloud' },
  { label: 'Data', copy: 'Trusted signals flowing into decisions.', icon: Database, kind: 'data' },
  { label: 'AI', copy: 'Agentic systems with accountable control.', icon: BrainCircuit, kind: 'ai' },
  { label: 'Architecture', copy: 'Connected systems with clear boundaries.', icon: Network, kind: 'architecture' },
]

export function CapabilityMotionGrid() {
  return <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24" aria-labelledby="systems-title"><div className="mb-10 max-w-2xl"><p className="font-mono text-[0.875rem] uppercase tracking-[0.18em] text-primary">Systems in motion</p><h2 id="systems-title" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">From infrastructure to intelligence.</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{capabilities.map(({ label, copy, icon: Icon, kind }) => <article key={label} className="motion-card group overflow-hidden border border-border bg-card"><div className={`motion-visual motion-${kind}`} aria-hidden="true"><Icon className="motion-icon" strokeWidth={1.5} /><span className="motion-orbit motion-orbit-one" /><span className="motion-orbit motion-orbit-two" /><span className="motion-pulse" /></div><div className="flex flex-col gap-2 border-t border-border p-5"><h3 className="text-xl font-medium tracking-tight">{label}</h3><p className="text-sm leading-relaxed text-muted-foreground">{copy}</p></div></article>)}</div></section>
}
