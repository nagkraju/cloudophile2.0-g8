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
      <path d="M17 17H6.6A3.4 3.4 0 0 1 5.6 10.4A4.8 4.8 0 0 1 14.2 8.2A4.8 4.8 0 0 1 17 17Z" />
    </svg>
  )
}
