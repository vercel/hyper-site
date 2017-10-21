import React from 'react'
import fetch from 'isomorphic-fetch'
import escapeHtml from 'escape-html'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import SearchNotFound from '../components/SearchNotFound'

// The variable "inputValue" will have the input value.
// This variable will be used in case the search is not successful.

const searchResult = async (search = null) => {
  const url = `https://api.npms.io/v2/search?q=keywords:hyper+${search}`
  const response = await fetch(url)
  return await response.json()
}

export default class extends React.Component {
  static async getInitialProps({ query: { q: search } }) {
    const plugins = await searchResult(escapeHtml(search))
    const inputValue = search
    return { plugins, inputValue }
  }
  render() {
    const plugins = this.props.plugins.results
    const totalResults = this.props.plugins.total
    const inputValue = this.props.inputValue
    if (totalResults > 0) {
      return (
        <Layout>
          <PluginsList plugins={plugins} />
        </Layout>
      )
    } else {
      return <SearchNotFound inputValue={inputValue} />
    }
  }
}
