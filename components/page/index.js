import Header from '../header'
import NextHead from 'next/head'
import SearchList from '../search-list'
import { useSearch } from 'lib/search-context'

export default ({ children, title, description }) => {
  const { search } = useSearch()

  return (
    <>
      <NextHead>
        <title>{title ?? 'Hyper™'}</title>
        {description && (
          <meta
            name="description"
            content={description ?? 'A terminal built on web technologies'}
          />
        )}
      </NextHead>
      <Header />
      {search ? <SearchList /> : <main>{children}</main>}
    </>
  )
}
