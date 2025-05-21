'use client'

import Header from '../header'
// import NextHead from 'next/head' // Removed: Not used in App Router
import SearchList from '../search-list'
import { useSearch } from 'lib/search-context'

export default ({
  children,
  title = 'Hyper™', // title, description, image props are no longer used by NextHead here
  description = 'A terminal built on web technologies',
  image = 'https://assets.vercel.com/image/upload/v1590627842/hyper/og-image-3.png',
}) => {
  const { search } = useSearch()

  return (
    <>
      {/* NextHead removed. Metadata should be handled by app/layout.js or page-specific metadata exports */}
      <Header />
      {search ? <SearchList /> : <main>{children}</main>}
    </>
  )
}
