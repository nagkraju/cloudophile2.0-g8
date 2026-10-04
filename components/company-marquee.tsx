import Image from 'next/image'

type Company = { name: string; src: string }

function CompanyList({ companies, hidden = false }: { companies: Company[]; hidden?: boolean }) {
  return (
    <ul className="marquee-group flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {companies.map((company) => (
        <li key={company.name} className="flex min-w-56 items-center justify-center gap-3 px-5">
          <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden bg-background">
            <Image src={company.src} alt="" fill sizes="48px" className={`object-contain ${company.name === 'Cisco' ? 'p-0.5' : 'p-1'}`} />
          </span>
          <span className="text-base font-semibold text-foreground">{company.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function CompanyMarquee({ label, companies }: { label: string; companies: Company[] }) {
  return <section aria-labelledby="journey-title" className="overflow-hidden border-b border-border bg-card/40"><div className="mx-auto flex max-w-screen-2xl items-center gap-6 px-4 sm:px-6 py-6 lg:px-8"><p id="journey-title" className="shrink-0 font-mono text-[0.875rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</p><div className="marquee-track flex min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"><CompanyList companies={companies} /><CompanyList companies={companies} hidden /></div></div></section>
}


