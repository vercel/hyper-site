'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import SearchBar from './search-bar'
import { Arrow, Logo } from '../icons'
import styles from './header.module.css'

const ActiveLink = ({ href, children }) => {
  const pathname = usePathname()

  return (
    (<Link
      href={href}
      className={`${styles.link} ${
        pathname.split('/')[1] === href.split('/')[1] ? styles.active : ''
      }`}>

      {children}

    </Link>)
  );
}

export default () => {
  const [mobileNavShown, setMobileNavShown] = useState(false)

  const toggle = () => setMobileNavShown(!mobileNavShown)

  return <>
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Hyper logo">

        <Logo width={31} height={23} />

      </Link>

      <nav className={styles.desktopNav}>
        <ActiveLink href="/plugins">Plugins</ActiveLink>
        <ActiveLink href="/themes">Themes</ActiveLink>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/vercel/hyper"
          className={styles.link}
        >
          GitHub
        </a>
        <ActiveLink href="/#installation">Download</ActiveLink>
        <ActiveLink href="/blog">Blog</ActiveLink>
      </nav>

      <div className={styles.rightNav}>
        <SearchBar />
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.vercel}
        >
          ▲
        </a>
      </div>

      <span className={styles.toggle} onClick={toggle}>
        <Arrow height={14} width={26} />
      </span>
    </header>

    <nav
      className={`${styles.mobileNav} ${mobileNavShown ? styles.active : ''}`}
    >
      <Link href="/plugins">
        Plugins
      </Link>
      <Link href="/themes">
        Themes
      </Link>
      <Link href="/store/submit">
        Submit
      </Link>
      <Link href="/blog">
        Blog
      </Link>
      <SearchBar />
    </nav>
  </>;
}
