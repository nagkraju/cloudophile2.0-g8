import type { SVGProps } from 'react'

export function CloudophileCloud({ strokeWidth = 1.5, ...props }: SVGProps<SVGSVGElement> & { strokeWidth?: number | string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.6 17H6.2a4.2 4.2 0 0 1-.7-8.3 6.5 6.5 0 0 1 12.6-.9A4.6 4.6 0 0 1 17.6 17Z" />
      <path d="M12 13v7" />
    </svg>
  )
}
