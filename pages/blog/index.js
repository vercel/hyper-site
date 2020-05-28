import Head from 'next/head'
import BlogPost from 'blog/hyper3.mdx'

// This page only handles the header meta tags which can't be added on an .mdx file

export default () => (
  <>
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@vercel" />
      <meta property="og:title" content="Hyper™" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hyper.is" />
      <meta
        property="og:image"
        content="https://hyper.is/blog/hyper-3-twitter-card.png"
      />
    </Head>

    <BlogPost />
  </>
)
