import Logo from './Logo'
import Link from 'next/link'
import ActiveLink from './ActiveLink'
import SearchInput from './Search'

export default ({ handleSearch }) => (
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

    <div className="header__right">
      <SearchInput handleSearch={handleSearch} />
      <a
        href="https://github.com/zeit/hyper-plugins/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store"
        target="_blank"
        rel="noopener"
        className="submit"
      >
        Submit
      </a>
    </div>

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

      a {
        font-size: 1.4rem;
      }

      .logo {
        display: flex;
      }

      .header__right {
        display: flex;
        align-items: center;
      }

      .submit {
        margin-left: 24px;
      }
    `}</style>
  </header>
)
