import '../styles/global.css'
import { SWRConfig } from 'swr'
import NProgress from 'nprogress'
import Router from 'next/router'
import { pageView as gTagPageView } from '../lib/gtag'

let timeout

const start = (url) => {
  timeout = setTimeout(NProgress.start, 200)
  gTagPageView(url)
}

const done = () => {
  clearTimeout(timeout)
  NProgress.done()
}

Router.events.on('routeChangeStart', start)
Router.events.on('routeChangeComplete', done)
Router.events.on('routeChangeError', done)

export default ({ Component, pageProps }) => {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then((r) => r.json()) }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
