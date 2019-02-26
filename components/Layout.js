import React from 'react'
import { withRouter } from 'next/router'
import Meta from './Meta'
import Header from './Header'
import SearchList from './SearchList'
import AppleLogo from '../components/icons/apple-logo.svg'
import LinuxLogo from '../components/icons/linux-logo.svg'
import WindowsLogo from '../components/icons/windows-logo.svg'
import * as gtag from '../lib/gtag'
import RouterEvents from '../lib/router-events'
import { format } from 'url'

RouterEvents.on('routeChangeComplete', url => {
  gtag.pageview(url)
})

class Layout extends React.Component {
  state = {
    searchQuery: null,
    originalURL: null,
    originalQuery: null
  }

  constructor() {
    super()

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    const { router } = this.props
    this.setState({
      originalURL: router.asPath,
      originalQuery: router.query.q || null
    })

    if (router.query.q) {
      this.setState({
        searchQuery: router.query.q
      })
    }
  }

  handleSearch(query) {
    const { router } = this.props
    const { originalQuery } = this.state
    const newQuery = query || originalQuery

    if (newQuery) {
      // We construct the original href for shallow routing
      const href = format({ pathname: router.pathname, query: router.query })
      // asPath will be different depending on user input
      const asPath = `/search?q=${newQuery}`
      router.replace(href, asPath, { shallow: true })
    } else {
      // When query is empty we render the original url
      router.replace(this.state.originalURL, this.state.originalURL, {
        shallow: true
      })
    }

    this.setState({
      searchQuery: newQuery
    })
  }

  render() {
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
