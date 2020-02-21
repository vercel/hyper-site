import React from 'react'
import { withRouter, useRouter } from 'next/router'
import Meta from './Meta'
import Header from './Header'
import SearchList from './SearchList'
import * as gtag from '../lib/gtag'
import RouterEvents from '../lib/router-events'
import { format } from 'url'

RouterEvents.on('routeChangeComplete', url => {
  gtag.pageview(url)
})

const Layout = ({ children }) => {
  const router = useRouter()
  const { q } = router.query
  const [search, setSearch] = React.useState()
  const handleSearch = newQuery => {
    const queryObj = { ...router.query }

    if (newQuery) {
      queryObj.q = newQuery
    } else {
      // When the query is empty, remove if from the URL
      delete queryObj.q
    }

    router.replace({ pathname: router.pathname, query: queryObj })
  }

  React.useEffect(() => {
    setSearch(q)
  }, [q])

  return (
    <div className="main">
      <Meta />

      <Header handleSearch={handleSearch} />

      {q ? (
        <SearchList query={search} />
      ) : (
        <div className="page">{children}</div>
      )}
    </div>
  )
}

export default Layout
