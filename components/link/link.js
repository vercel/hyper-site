import Link from 'next/link'

export default ({ href, children, className = '', as }) => {
  const isInternal = /^\/(?!\/)/.test(href)

  if (isInternal)
    return (
      <Link href={href} as={as}>
        <a className={className}>{children}</a>
      </Link>
    )

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
