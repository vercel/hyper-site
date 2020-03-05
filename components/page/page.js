import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../header'
import Footer from '../footer'
import SearchList from '../search-list'
import { pageView as gTagPageView } from '../../lib/gtag'

export default ({ children, footer = false }) => {
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
      <Header />

      {q ? <SearchList /> : children}

      {footer && <Footer />}
    </>
  )
}
