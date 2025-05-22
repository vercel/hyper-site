'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { pageView as gTagPageView } from 'lib/gtag'
import { SearchContext } from 'lib/search-context'

let timeout

export function SearchProvider({ children }) {
  const [search, setSearch] = useState('')
  const pathname = usePathname()

  const start = (url) => {
    timeout = setTimeout(NProgress.start, 500)
    gTagPageView(url)
  }

  const done = () => {
    clearTimeout(timeout)
    setSearch('')
    NProgress.done()
  }

  useEffect(() => {
    // Handle initial page load
    done()
    
    return () => {
      clearTimeout(timeout)
    }
  }, [pathname])

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}