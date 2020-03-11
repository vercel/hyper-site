import { useState } from 'react'
import Link from './header-link'
import SearchBar from './search-bar'
import { Arrow, Logo } from '../icons'
import styles from './header.module.css'

export default () => {
  const [mobileNavShown, setMobileNavShown] = useState(false)

  const toggle = () => setMobileNavShown(!mobileNavShown)

  return (
    <>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Logo width={31} height={23} />
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

        <span className={styles.toggle} onClick={toggle}>
          <Arrow height={14} width={26} />
        </span>
      </header>

      <nav
        className={`${styles.mobileNav} ${mobileNavShown ? styles.active : ''}`}
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
