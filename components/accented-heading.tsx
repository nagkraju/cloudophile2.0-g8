type AccentedHeadingProps = {
  children: string
  className?: string
}

export function AccentedHeading({ children, className }: AccentedHeadingProps) {
  const words = children.trim().split(/\s+/)
  const accentStart = Math.max(words.length - 2, 0)
  const leading = words.slice(0, accentStart).join(' ')
  const accent = words.slice(accentStart).join(' ')

  return (
    <h1 className={className}>
      {leading ? `${leading} ` : null}
      <span className="text-gradient">{accent}</span>
    </h1>
  )
}
