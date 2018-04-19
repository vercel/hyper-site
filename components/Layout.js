import React from 'react'
import { withRouter } from 'next/router'
import Meta from './Meta'
import Header from './Header'
import SearchList from './SearchList'
import AppleLogo from '../static/apple-logo.svg'
import LinuxLogo from '../static/linux-logo.svg'
import WindowsLogo from '../static/windows-logo.svg'
import * as gtag from '../lib/gtag'
import RouterEvents from '../lib/router-events'
import { format } from 'url'

RouterEvents.on('routeChangeComplete', url => {
  gtag.pageview(url)
})

class Layout extends React.Component {
  constructor() {
    super()

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { router } = nextProps
    console.log(router.asPath)
    if (!/^\/search/.exec(router.asPath)) {
      this.setState({
        searchQuery: null,
        originalURL: router.asPath
      })
    } else {
      this.setState({
        originalURL: router.asPath
      })
    }
  }

  componentDidMount() {
    const { router } = this.props
    this.setState({
      originalURL: router.asPath
    })
  }

  handleSearch(query) {
    const { router } = this.props
    if (query) {
      // We construct the original href for shallow routing
      const href = format({ pathname: router.pathname, query: router.query })
      // asPath will be different depending on user input
      const asPath = `/search?q=${query}`
      router.replace(href, asPath, { shallow: true })
    } else {
      // When query is empty we render the original url
      router.replace(this.state.originalURL, this.state.originalURL, {
        shallow: true
      })
    }

    this.setState({
      searchQuery: query
    })
  }

  render() {
    console.log(
      this.state && this.state.searchQuery,
      this.props.query,
      this.props.router
    )
    return (
      <div className="main">
        <Meta />

        <Header handleSearch={this.handleSearch} />

        {(this.state && this.state.searchQuery) ||
        this.props.query ||
        this.props.router.query.q ? (
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
      </div>
    )
  }
}

export default withRouter(Layout)
