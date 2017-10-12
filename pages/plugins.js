import React from 'react';
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import getPlugins from '../lib/get-plugins'

export default class extends React.Component {
  static async getInitialProps () {
    const plugins = await getPlugins('plugins')
    return { plugins }
  }

  render () {
    const plugins = this.props.plugins.results
    return <Layout>
      <PluginsList plugins={plugins} />
    </Layout>
  }
}
