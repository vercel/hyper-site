import 'styles/global.css'
import { useState, useEffect } from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import { pageView as gTagPageView } from 'lib/gtag'
import { SearchContext } from 'lib/search-context'

let timeout

export default ({ Component, pageProps }) => {
  const [search, setSearch] = useState('')

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
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', done)
    Router.events.on('routeChangeError', done)

    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', done)
      Router.events.off('routeChangeError', done)
    }
  }, [])

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <Component {...pageProps} />
    </SearchContext.Provider>
  )
}
