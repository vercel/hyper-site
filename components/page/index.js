import { useState } from 'react'
import Header from '../header'
import SearchList from '../search-list'

export default ({ children }) => {
  const [search, setSearch] = useState('')

  const handleSearch = (newSearch) => setSearch(newSearch)

  return (
    <>
      <Header onSearch={handleSearch} />
      {search ? <SearchList query={search} /> : <main>{children}</main>}
    </>
  )
}
