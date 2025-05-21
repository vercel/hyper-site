'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { pageView as gTagPageView } from '../lib/gtag'
import { SearchContext } from '../lib/search-context'

export default function Providers({ children }) {
  const [search, setSearch] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const timeout = setTimeout(NProgress.start, 500)
    gTagPageView(window.location.href)
    return () => {
      clearTimeout(timeout)
      setSearch('')
      NProgress.done()
    }
  }, [pathname])

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}
