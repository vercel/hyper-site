import 'styles/global.css'
import { GA_TRACKING_ID } from 'lib/gtag'
import { SearchProvider } from './search-provider'
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SearchProvider>
          {children}
        </SearchProvider>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </body>
    </html>
  )
}