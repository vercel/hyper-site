import React from 'react'
import cachedFetch from '../lib/cached-json-fetch'
import escapeHtml from 'escape-html'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'

const searchResult = async (search = null) => {
  const url = `https://api.npms.io/v2/search?q=${search}+keywords:hyper-plugin,hyper-theme`
  return await cachedFetch(url)
}

export default class extends React.Component {
  static async getInitialProps({ query: { q: search } }) {
    const plugins = await searchResult(escapeHtml(search))
    const searchTerm = search
    return { plugins, searchTerm }
  }
  render() {
    const plugins = this.props.plugins.results
    const totalResults = this.props.plugins.total
    const { searchTerm } = this.props

    // In the case of search results, render the plugins list
    if (totalResults > 0) {
      return (
        <Layout>
          <PluginsList plugins={plugins} />
        </Layout>
      )
    }

    // In the case of no search results, return this
    return (
      <Layout>
        <div className="search__error">
          <p>
            Your search for "<b>{searchTerm}</b>" did not match any plugins or
            themes 😱 <br />
            Make sure the search term is spelled correctly.
          </p>
        </div>

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
    )
  }
}
