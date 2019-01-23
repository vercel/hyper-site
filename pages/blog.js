import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../components/Layout'
import Hyper3 from '../components/posts/hyper-3.mdx'

class Blog extends React.Component {
  render() {
    return (
      <Layout>
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
          `}
        </style>
      </Layout>
    )
  }
}

export default withRouter(Blog)
