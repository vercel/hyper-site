import { useState, useEffect } from 'react'
import Router from 'next/router'
import Header from '../header'
import SearchList from '../search-list'

export default ({ children }) => {
  const [search, setSearch] = useState('')

  const handleSearch = (newSearch) => setSearch(newSearch)
  const clearSearch = () => setSearch('')

  useEffect(() => {
    Router.events.on('routeChangeComplete', clearSearch)
    return () => {
      Router.events.off('routeChangeComplete', clearSearch)
    }
  }, [])

  return (
    <>
      <Header onSearch={handleSearch} />
      {search ? <SearchList query={search} /> : <main>{children}</main>}
    </>
  )
}
