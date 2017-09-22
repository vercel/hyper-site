import React from 'react';
import Layout from '../components/Layout'
import Plugins from '../components/Plugins'
import getPlugins from '../lib/get-plugins'

export default class extends React.Component {
  static async getInitialProps () {
    const plugins = await getPlugins('plugins')
    return { plugins }
  }

  render () {
    const plugins = this.props.plugins.results
    return <Layout>
      <Plugins plugins={plugins} />
    </Layout>
  }
}
