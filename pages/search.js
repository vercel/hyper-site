import React from 'react'
import escapeHtml from 'escape-html'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import searchResult from '../lib/search-result'

export default class extends React.Component {
  static async getInitialProps({ query: { q: search } }) {
    const plugins = await searchResult(escapeHtml(search))
    return { plugins }
  }
  render() {
    const plugins = this.props.plugins.results
    return (
      <Layout>
        <PluginsList plugins={plugins} />
      </Layout>
    )
  }
}
