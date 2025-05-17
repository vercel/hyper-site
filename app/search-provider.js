'use client'

import { useState } from 'react'
import { SearchContext } from 'lib/search-context'
import SearchList from 'components/search-list'

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {search ? (
        <SearchList />
      ) : (
        <main>{children}</main>
      )}
    </SearchContext.Provider>
  )
}
