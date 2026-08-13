import Image from 'next/image'

const companies = [
  { name: 'Microsoft', src: '/brands/microsoft.svg' },
  { name: 'AWS', src: '/brands/aws.svg' },
  { name: 'Amazon', src: '/brands/amazon.svg' },
  { name: 'Fidelity', src: '/brands/fidelity.png' },
  { name: 'Intuit', src: '/brands/intuit.svg' },
  { name: 'Cisco', src: '/brands/cisco.svg' },
  { name: 'LTM', src: '/brands/ltm.svg' },
]

function CompanyList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee-group flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {companies.map((company) => (
        <li key={company.name} className="flex min-w-48 items-center justify-center gap-3 px-7 sm:min-w-56">
          <span className="relative block h-8 w-24 sm:w-28">
            <Image src={company.src} alt={hidden ? '' : `${company.name} logo`} fill sizes="112px" className="object-contain" />
          </span>
          <span className="sr-only">{company.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function CompanyMarquee() {
  return (
    <section aria-labelledby="journey-title" className="overflow-hidden border-b border-border bg-card/40">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-6 lg:px-8">
        <p id="journey-title" className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Techno-leadership journey</p>
        <div className="marquee-track flex min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <CompanyList />
          <CompanyList hidden />
        </div>
      </div>
    </section>
  )
}
