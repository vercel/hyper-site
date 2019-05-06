import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import Hyper3 from '../components/posts/hyper-3.mdx'

class Blog extends React.Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>Hyper Blog</title>
        </Head>
        <div className="container">
          <div className="content">
            <Hyper3 />
          </div>
        </div>
        <style jsx>
          {`
            .container {
              display: flex;
              justify-content: center;
              width: 100%;
              position: relative;
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
            }

            .content :global(p:not(.caption)) {
              font-size: 16px;
              line-height: 32px;
              margin: 0 0 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                'Droid Sans', 'Helvetica Neue', sans-serif;
            }

            .content :global(.oversize) {
              width: 150%;
              margin-left: -28%;
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default withRouter(Blog)
