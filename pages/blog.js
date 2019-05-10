import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import InlineCode from '../components/blog/inline-code'
import Hyper3 from '../components/posts/hyper-3.mdx'

const MDXComponents = {
  inlineCode: InlineCode
}

class Blog extends React.Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>Hyper Blog</title>
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:site" content="@zeithq" />
          <meta property="og:title" content="Hyper™" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://hyper.is/blog" />
          <meta
            property="description"
            content="Hyper 3: A cross-platform HTML/JS/CSS terminal"
          />
          <meta
            property="og:description"
            content="Hyper 3: A cross-platform HTML/JS/CSS terminal"
          />
          <meta
            property="og:image"
            content="https://hyper.is/static/blog/hyper-3-twitter-card.png"
          />
        </Head>
        <div className="container">
          <div className="content">
            <Hyper3 components={MDXComponents} />
          </div>
        </div>
        <style jsx>
          {`
            .container {
              display: flex;
              justify-content: center;
              width: 100%;
              position: relative;
              overflow: hidden;
            }

            .content {
              max-width: 750px;
            }

            .content :global(h1) {
              font-weight: 600;
              font-size: 36px;
              max-width: 900px;
              text-align: center;
              padding-left: 20px;
              padding-right: 20px;
              line-height: 46px;
              letter-spacing: -0.015em;
              margin: 0px auto;
              margin-bottom: 20px;
            }

            .content :global(p:not(.caption)) {
              font-size: 16px;
              line-height: 32px;
              margin: 0 0 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                'Droid Sans', 'Helvetica Neue', sans-serif;
            }

            .content :global(ul:not(.authors) li) {
              font-size: 16px;
              line-height: 2em;
            }

            .content :global(.heading) {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-top: 48px;
              padding: 0 40px;
              text-align: center;
              z-index: 1000;
            }

            .content :global(.authors) {
              margin: 0;
              margin-top: 30px;
              padding: 0;
              list-style: none;
              display: flex;
              justify-content: space-around;
              align-items: center;
            }

            .content :global(.oversize) {
              width: 150%;
              margin-left: -28%;
            }

            .content :global(time) {
              width: 100%;
              text-align: center;
              color: #999;
              font-size: 12px;
            }

            .content :global(hr) {
              margin: 50px 0;
              margin-left: -100vw;
              margin-right: -100vw;
              border: none;
              height: 1px;
              background-color: rgba(255, 255, 255, 0.4);
            }

            @media (max-width: 768px) {
              .container .content {
                width: 100vw;
                padding: 0 35px;
              }
              .content :global(.authors) {
                flex-wrap: wrap;
              }
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default withRouter(Blog)
