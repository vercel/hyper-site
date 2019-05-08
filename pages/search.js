import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'

export default class extends React.Component {
  render() {
    return (
      <div>
        <Head>
          {this.props.url.query.q ? (
            <title>Hyper Store - Search for "{this.props.url.query.q}"</title>
          ) : (
            <title>Hyper Store - No search term</title>
          )}
        </Head>
        <Layout query={this.props.url.query.q}>
          {!this.props.url.query.q && (
            <div className="search__error">
              Please enter a search term to find a plugin or theme
            </div>
          )}
          <style jsx>{`
            .search__error {
              width: 100%;
              text-align: center;
              height: calc(100vh - 122px);
              min-height: 124px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.4rem;
            }
          `}</style>
        </Layout>
      </div>
    )
  }
}
