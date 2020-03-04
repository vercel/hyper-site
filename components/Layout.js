import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from './Header'
import SearchList from './SearchList'
import { pageView as gTagPageView } from '../lib/gtag'

const Layout = ({ children }) => {
  const router = useRouter()
  const { q } = router.query
  const [search, setSearch] = useState()
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

  useEffect(() => {
    router.events.on('routeChangeStart', url => gTagPageView(url))
    return () => {
      router.events.off('routeChangeStart', url => gTagPageView(url))
    }
  }, [q])

  return (
    <div className="main">
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
