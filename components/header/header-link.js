import { useRouter } from 'next/router'
import Link from '../link'
import styles from './header-link.module.css'

export default ({ href, children, className = '' }) => {
  const { pathname } = useRouter()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`${styles.link} ${isActive ? styles.active : ''} ${className}`}
    >
      {children}
    </Link>
  )
}
