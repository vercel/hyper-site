import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../header'
import Footer from '../footer'
import SearchList from '../search-list'
import { pageView as gTagPageView } from '../../lib/gtag'

export default ({ children, title, footer = false }) => {
  const router = useRouter()
  const { q } = router.query

  useEffect(() => {
    router.events.on('routeChangeStart', url => gTagPageView(url))
    return () => {
      router.events.off('routeChangeStart', url => gTagPageView(url))
    }
  }, [q])

  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <Header />

      {q ? <SearchList /> : children}

      {footer && !q && <Footer />}
    </>
  )
}
