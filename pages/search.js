import React from 'react'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import { search } from '../containers/Search'
import searchResult from '../lib/search-result'

export default class extends React.Component {
  static async getInitialProps() {
    const plugins = await searchResult(search)
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
