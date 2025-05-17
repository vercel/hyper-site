import 'styles/global.css'
import { SearchContext } from 'lib/search-context'
import Header from 'components/header'
import SearchList from 'components/search-list'
import SearchProvider from './search-provider'

export const metadata = {
  title: {
    default: 'Hyper™',
    template: '%s | Hyper™',
  },
  description: 'A terminal built on web technologies',
  openGraph: {
    title: {
      default: 'Hyper™',
      template: '%s | Hyper™',
    },
    description: 'A terminal built on web technologies',
    url: 'https://hyper.is',
    siteName: 'Hyper™',
    images: [
      {
        url: 'https://assets.vercel.com/image/upload/v1590627842/hyper/og-image-3.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SearchProvider>
          <Header />
          {children}
        </SearchProvider>
      </body>
    </html>
  )
}
