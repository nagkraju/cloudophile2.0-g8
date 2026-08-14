import Image from 'next/image'

const companies = [
  { name: 'Microsoft', src: '/brands/microsoft.svg' },
  { name: 'Amazon', src: '/brands/aws-uploaded.jpg' },
  { name: 'Fidelity', src: '/brands/fidelity-uploaded.jpeg' },
  { name: 'LTM', src: '/brands/ltm.svg' },
  { name: 'Intuit', src: '/brands/intuit.svg' },
  { name: 'Cisco', src: '/brands/cisco.svg' },
]

function CompanyList({ hidden = false }: { hidden?: boolean }) {
  return <ul className="marquee-group flex shrink-0 items-center" aria-hidden={hidden || undefined}>{companies.map((company) => <li key={company.name} className="flex min-w-52 items-center justify-center px-7"><span className="relative block h-12 w-32 overflow-hidden rounded-sm bg-foreground/95 p-1"><Image src={company.src} alt={hidden ? '' : `${company.name} logo`} fill sizes="128px" className="object-contain" /></span><span className="sr-only">{company.name}</span></li>)}</ul>
}

export function CompanyMarquee() {
  return <section aria-labelledby="journey-title" className="overflow-hidden border-b border-border bg-card/40"><div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-6 lg:px-8"><p id="journey-title" className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Techno-leadership journey</p><div className="marquee-track flex min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"><CompanyList /><CompanyList hidden /></div></div></section>
}
