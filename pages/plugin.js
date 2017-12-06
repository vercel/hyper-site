import React from 'react'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'
import Layout from '../components/Layout'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const result = await fetch(`https://api.npms.io/v2/package/${query.name}`)
    const json = await result.json()
    return { plugin: json.collected.metadata }
  }

  render() {
    return (
      <Layout>
        <Markdown
          className="plugin__readme"
          source={this.props.plugin.readme}
          escapeHtml={false}
        />

        <style jsx global>{`
          .plugin__readme h1 {
            font-weight: 400;
            font-size: 1.6rem;
            text-align: center;
            display: block;
            margin-bottom: 16px;
          }

          .plugin__readme h1:first-of-type + h2:first-of-type {
            color: #999999;
            text-align: center;
            max-width: 40rem;
            margin: 0 auto;
            margin-bottom: 32px;
          }

          .plugin__readme h1:first-of-type + h2:first-of-type + p {
            text-align: center;
            width: 100%;
          }

          .plugin__readme h2:first-of-type + p img {
            max-width: 100%;
            width: 600px;
          }

          :global(.plugin__readme p) {
            font-size: 1.2rem;
          }
        `}</style>
      </Layout>
    )
  }
}
