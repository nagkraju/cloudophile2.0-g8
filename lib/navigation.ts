export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Articles', href: '/articles' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Contact', href: '/contact' },
]

export const nextPageByPath = Object.fromEntries(navLinks.map((link, index) => [link.href, navLinks[(index + 1) % navLinks.length]]))

export const navLinkClass = 'shrink-0 border-b-2 border-transparent py-2 transition-colors hover:text-foreground'
export const navLinkActiveClass = 'border-primary text-foreground'
export const navListClass = 'col-span-3 row-start-2 flex min-w-0 items-center justify-start gap-4 overflow-x-auto text-sm font-medium text-muted-foreground sm:col-span-1 sm:row-start-auto sm:justify-center lg:gap-6'
export const navGridClass = 'mx-auto grid min-h-20 max-w-screen-2xl grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6 sm:py-0 lg:px-8'
