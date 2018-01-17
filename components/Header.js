import Logo from './Logo'
import Link from 'next/link'
import ActiveLink from './ActiveLink'
import SearchInput from './Search'

export default () => (
  <header className="container">
    <Link prefetch href="/">
      <a className="logo">
        <Logo />
      </a>
    </Link>

    <nav>
      <ActiveLink href="/plugins">Plugins</ActiveLink>
      <ActiveLink href="/themes">Themes</ActiveLink>
    </nav>

    <SearchInput />

    <style jsx>{`
      header {
        padding-top: 32px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        position: relative;
        align-items: center;
      }

      nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        line-height: 2.3rem;
      }

      .logo {
        display: flex;
      }
    `}</style>
  </header>
)
