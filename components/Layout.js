import React from 'react'
import Router from 'next/router'
import Meta from './Meta'
import Header from './Header'
import SearchList from './SearchList'
import AppleLogo from '../static/apple-logo.svg'
import LinuxLogo from '../static/linux-logo.svg'
import WindowsLogo from '../static/windows-logo.svg'

export default class extends React.Component {
  constructor() {
    super()

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.setState({
      originalURL: Router.asPath
    })
  }

  handleSearch(query) {
    if (query) {
      const url = `/search?q=${query}`
      window.history.pushState(
        query,
        `Hyper Store - Searching for ${query}`,
        url
      )
    } else {
      window.history.pushState({}, 'Hyper Store', this.state.originalURL)
    }

    this.setState({
      searchQuery: query
    })
  }

  render() {
    return (
      <div className="main">
        <Meta />

        <div className="info-bar">
          <div className="info-bar__contents container">
            <a className="zeit-logo" target="_blank" href="https://zeit.co">
              ▲
            </a>
            <nav>
              <a target="_blank" href="https://github.com/zeit/hyper/releases">
                Changelog
              </a>
              <a target="_blank" href="https://github.com/zeit/hyper">
                GitHub
              </a>
              <span>
                License:&nbsp;<b>MIT</b>
              </span>
              <span>
                <span id="download-for">Download for:</span>
                <a href="/#installation" className="download-link">
                  <AppleLogo />
                </a>
                <a href="/#installation" className="download-link">
                  <WindowsLogo />
                </a>
                <a href="/#installation" className="download-link">
                  <LinuxLogo />
                </a>
              </span>
            </nav>
          </div>
        </div>

        <Header handleSearch={this.handleSearch} />

        {(this.state && this.state.searchQuery) || this.props.query ? (
          <SearchList
            query={
              this.state && this.state.searchQuery
                ? this.state.searchQuery
                : this.props.query
            }
          />
        ) : (
          <div className="page">{this.props.children}</div>
        )}

        <style jsx>{`
          .info-bar {
            height: 3.2rem;
            width: 100%;
            position: relative;
            z-index: 10000;
            background: #111;
            display: flex;
            align-items: center;
          }

          .info-bar__contents {
            display: flex;
          }

          .info-bar a {
            color: #999;
          }

          .info-bar a:hover {
            color: #ff2e88;
          }

          .info-bar__contents nav {
            margin-left: auto;
            display: flex;
          }

          .info-bar nav a {
            text-decoration: none;
            height: 16px;
            margin-left: 6px;
            margin-right: 4px;
          }

          .info-bar__contents nav > * {
            margin-left: 12px;
          }

          .info-bar span {
            color: #999;
            display: flex;
            align-items: center;
          }

          .info-bar :global(svg) {
            fill: currentColor;
            height: 16px;
          }
        `}</style>
      </div>
    )
  }
}
