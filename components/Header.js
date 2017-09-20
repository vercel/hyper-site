import Logo from './Logo'
import Link from 'next/link'

export default () => (
  <header>
    <Link prefetch href="/">
      <a>
        <Logo />
      </a>
    </Link>

    <nav>
      <a href="#">Plugins</a>
      <a href="#">Themes</a>
    </nav>

    <span>Search...</span>

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

      nav a:not(:last-of-type) {
        margin-right: 24px;
      }
    `}</style>
  </header>
)
