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
              max-width: 650px;
            }
            .content {
              max-width: 650px;
            }

            .content :global(p) {
              font-size: 14px;
              line-height: 24px;
              margin: 0 0 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                'Droid Sans', 'Helvetica Neue', sans-serif;
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default withRouter(Blog)
