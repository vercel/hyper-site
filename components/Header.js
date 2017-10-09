import Logo from './Logo'
import Link from 'next/link'
import ActiveLink from './ActiveLink'
import Search from './Search'

export default () => (
  <header>
    <Link prefetch href="/">
      <a>
        <Logo />
      </a>
    </Link>

    <nav>
      <ActiveLink href="/plugins">Plugins</ActiveLink>
      <ActiveLink href="/themes">Themes</ActiveLink>
    </nav>
    
    <Search/>

    <style jsx>{`
      header {
        padding-top: 32px;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        position: relative;
      }

      nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        line-height: 2.3rem;
      }
    `}</style>
  </header>
)
