import React from 'react'
import Logo from './Logo'
import MobileNavToggle from '../static/mobile-nav-arrow.svg'
import Link from 'next/link'
import ActiveLink from './ActiveLink'
import SearchInput from './Search'

export default class Header extends React.Component {
  constructor() {
    super()

    this.state = {
      mobileNavShown: false
    }

    this.toggleMobileNav = this.toggleMobileNav.bind(this)
  }

  toggleMobileNav() {
    this.setState({
      mobileNavShown: !this.state.mobileNavShown
    })
  }

  render() {
    const { mobileNavShown } = this.state
    return (
      <React.Fragment>
        <header className="container">
          <Link prefetch href="/">
            <a className="logo">
              <Logo />
            </a>
          </Link>

          <nav>
            <ActiveLink href="/plugins" handleClick={this.toggleMobileNav}>
              Plugins
            </ActiveLink>
            <ActiveLink href="/themes">Themes</ActiveLink>
            <a
              href="https://github.com/zeit/hyper"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            <a href="/#installation">Download</a>
          </nav>

          <div className="header__right">
            <SearchInput handleSearch={this.props.handleSearch} />
            <a
              className="zeit-logo"
              target="_blank"
              href="https://zeit.co"
              rel="noopener"
            >
              <b>△</b>
            </a>
          </div>

          <a className="header__mobile-toggle" onClick={this.toggleMobileNav}>
            <MobileNavToggle />
          </a>
        </header>

        <nav className="header__mobile-nav container">
          <ActiveLink href="/plugins">Plugins</ActiveLink>
          <ActiveLink href="/themes">Themes</ActiveLink>
          <a
            href="https://github.com/zeit/hyper-plugins/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store"
            target="_blank"
            rel="noopener"
            className="zeit-logo"
          >
            Submit
          </a>
          <SearchInput handleSearch={this.props.handleSearch} />
        </nav>

        <style jsx>{`
          header {
            padding-top: 32px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            position: relative;
            align-items: center;
            z-index: 2000;
          }

          nav {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            line-height: 2.3rem;
          }

          a {
            font-size: 1.4rem;
            color: #999999;
            transition: color 0.2s ease;
          }

          a:hover {
            color: white;
          }

          nav :global(a):not(:last-child) {
            margin-right: 24px;
          }

          .logo {
            display: flex;
          }

          .header__right {
            display: flex;
            align-items: center;
          }

          .header__right a:last-child {
            margin-left: 24px;
          }

          .submit {
            margin-left: 24px;
          }

          .header__mobile-nav {
            display: none;
          }

          .header__mobile-toggle {
            display: none;
          }

          .zeit-logo {
            font-size: 1.8rem;
            color: white;
          }

          @media (max-width: 768px) {
            nav,
            .header__right {
              display: none;
            }

            .header__mobile-toggle {
              display: block;
            }

            .header__mobile-nav {
              display: ${mobileNavShown ? 'flex' : 'none'};
              width: 100%;
              flex-direction: column;
              align-items: center;
              position: relative;
              margin-bottom: 48px;
            }

            .header__mobile-nav :global(a),
            .header__mobile-nav :global(.search-input) {
              height: 48px;
              width: 100%;
              border-bottom: 1px solid #333;
              font-size: 1.6rem;
              display: flex;
              align-items: center;
              color: white;
            }

            .header__mobile-nav :global(.search-input input) {
              width: 100%;
              font-size: 1.6rem;
            }

            .header__mobile-nav :global(a):not(:last-child) {
              margin-right: 0;
            }
          }
        `}</style>
      </React.Fragment>
    )
  }
}
