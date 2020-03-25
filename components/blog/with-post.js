import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import Page from '../page'
import InlineCode from './inline-code'
import Author from './author'

export default (meta) => ({ children }) => (
  <Page>
    <Head>
      <title>Hyper Blog</title>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@zeithq" />
      <meta property="og:title" content="Hyper™" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hyper.is" />
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
        content="https://hyper.is/blog/hyper-3-twitter-card.png"
      />
    </Head>

    <div className="container">
      <div className="content">
        <MDXProvider components={{ inlineCode: InlineCode }}>
          <div className="title">
            <h1>{meta.title}</h1>
          </div>

          <div className="authors">
            {meta.authors.map((author, i) => (
              <Author key={i} {...author} />
            ))}
          </div>

          <hr />

          {children}
        </MDXProvider>
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
          padding-bottom: 160px;
          max-width: unset;
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
          line-height: 32px;
          margin: 0 0 20px;
        }

        .content :global(li) {
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

        .content > :global(img) {
          max-width: 100%;
          height: auto;
          margin: 1rem auto 0;
        }

        .content :global(.oversize) {
          max-width: 150%;
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

        .content :global(.caption + img) {
          margin-top: 0;
        }

        .content :global(.caption) {
          color: #999;
          text-align: center;
          margin: 0 0 32px;
        }

        .title {
          padding: 100px 0 50px 0;
        }

        .content :global(.button) {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .container .content {
            width: 100vw;
            padding: 0;
          }
          .content :global(.authors) {
            flex-wrap: wrap;
          }

          .content :global(.oversize) {
            max-width: 100%;
            width: unset;
            margin-left: unset;
          }
        }
      `}
    </style>
  </Page>
)
