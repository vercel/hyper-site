import '../styles/global.css'
import { SWRConfig } from 'swr'

export default ({ Component, pageProps }) => (
  <SWRConfig value={{ fetcher: url => fetch(url).then(r => r.json()) }}>
    <Component {...pageProps} />
  </SWRConfig>
)
