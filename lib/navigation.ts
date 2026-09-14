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
export const navItemsClass = 'flex min-w-0 items-center gap-4 overflow-x-auto text-sm font-medium text-muted-foreground lg:gap-6'
export const navListClass = `col-span-3 row-start-2 ${navItemsClass} justify-start sm:col-span-1 sm:row-start-auto sm:justify-center`
export const navGridClass = 'mx-auto grid min-h-20 max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6 sm:py-0 lg:px-8'
