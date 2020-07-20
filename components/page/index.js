import Header from '../header'
import NextHead from 'next/head'
import SearchList from '../search-list'
import { useSearch } from 'lib/search-context'

export default ({
  children,
  title = 'Hyper™',
  description = 'A terminal built on web technologies',
  image = 'https://assets.vercel.com/image/upload/v1590627842/hyper/og-image-3.png',
}) => {
  const { search } = useSearch()

  return (
    <>
      <NextHead>
        {/* Preload */}
        <link
          rel="preload"
          href="https://assets.vercel.com/raw/upload/v1587415301/fonts/2/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Title */}
        <title>{title}</title>
        <meta name="og:title" content={title} />

        {/* Description */}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />

        {/* Image */}
        <meta name="twitter:image" content={image} />
        <meta property="og:image" content={image} />

        {/* URL */}
        <meta property="og:url" content="https://hyper.is" />
        <meta name="twitter:site" content="@vercel" />

        {/* General */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="/apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="theme-color" content="#000000" />
      </NextHead>

      <Header />
      {search ? <SearchList /> : <main>{children}</main>}
    </>
  )
}
