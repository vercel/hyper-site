'use client' // Mark as a Client Component

import { useState, Suspense } from 'react' // Import Suspense
import '../styles/global.css'
import { SearchContext } from '../lib/search-context'
import { GA_TRACKING_ID } from '../lib/gtag'
import { NavigationEvents } from './components/navigation-events' // Import NavigationEvents

// Removed metadata export as it's not allowed in client components.
// Title will be handled directly in <head> for now.

export default function RootLayout({ children }) {
  const [search, setSearch] = useState('')

  return (
    <html lang="en">
      <head>
        <title>Hyper</title> {/* Static title for now */}
        {/* Google Analytics Scripts */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </head>
      <body>
        <SearchContext.Provider value={{ search, setSearch }}>
          <Suspense fallback={null}>
            {' '}
            {/* Wrap NavigationEvents in Suspense */}
            <NavigationEvents />
          </Suspense>
          <main>{children}</main>
        </SearchContext.Provider>
      </body>
    </html>
  )
}
