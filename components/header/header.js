import { useState } from 'react'
import Logo from '../icons/logo.svg'
import Link from './header-link'
import SearchBar from './search-bar'
import MobileNavToggle from '../icons/mobile-nav-arrow.svg'
import styles from './header.module.css'

export default () => {
  const [mobileNavShown, setMobileNavShown] = useState(false)

  const toggle = () => setMobileNavShown(!mobileNavShown)

  return (
    <>
      <header className={`container ${styles.header}`}>
        <Link className={styles.logo} href="/">
          <Logo />
        </Link>

        <nav className={styles.desktopNav}>
          <Link href="/plugins">Plugins</Link>
          <Link href="/themes">Themes</Link>
          <Link href="https://github.com/zeit/hyper">GitHub</Link>
          <Link href="/#installation">Download</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        <div className={styles.rightNav}>
          <SearchBar />
          <Link className={styles.zeit} href="https://zeit.co">
            △
          </Link>
        </div>

        <span
          className={`${styles.toggle} ${mobileNavShown ? styles.active : ''}`}
          onClick={toggle}
        >
          <MobileNavToggle />
        </span>
      </header>

      <nav
        className={`container ${styles.mobileNav} ${
          mobileNavShown ? styles.active : ''
        }`}
      >
        <Link href="/plugins">Plugins</Link>
        <Link href="/themes">Themes</Link>
        <Link href="https://github.com/zeit/hyper-plugins/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store">
          Submit
        </Link>
        <Link href="/blog">Blog</Link>
        <SearchBar />
      </nav>
    </>
  )
}
