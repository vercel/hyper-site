'use client'

import { useState, Suspense } from 'react'
import { SearchContext } from 'lib/search-context'
import SearchList from 'components/search-list'

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {search ? (
        <Suspense fallback={<div>Loading search results...</div>}>
          <SearchList />
        </Suspense>
      ) : (
        <main>{children}</main>
      )}
    </SearchContext.Provider>
  )
}
