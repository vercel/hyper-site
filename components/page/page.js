import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../header'
import SearchList from '../search-list'
import { pageView as gTagPageView } from '../../lib/gtag'

export default ({ children }) => {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleSearch = newSearch => setSearch(newSearch)

  useEffect(() => {
    router.events.on('routeChangeStart', url => gTagPageView(url))
    return () => {
      router.events.off('routeChangeStart', url => gTagPageView(url))
    }
  }, [])

  return (
    <>
      <Header onSearch={handleSearch} />
      {search ? <SearchList query={search} /> : children}
    </>
  )
}
