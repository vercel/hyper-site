import '../styles/global.css'
import Providers from './providers'
import Script from 'next/script'
import { GA_TRACKING_ID } from '../lib/gtag'

export const metadata = {
  title: 'Hyper',
  description: 'The official website for the Hyper terminal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <Script id="gtag-init" dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}');`,
        }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
