import React from 'react'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import Filter from '../components/Filter'
import getPlugins from '../lib/get-plugins'

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      filter: 'featured'
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  static async getInitialProps() {
    const plugins = await getPlugins('plugins')
    return { plugins }
  }

  handleFilterChange(filter) {
    this.setState({
      filter
    })
  }

  render() {
    const plugins = this.props.plugins.results
    return (
      <Layout>
        <Filter
          handleFilterChange={this.handleFilterChange}
          currentFilter={this.state.filter}
        />
        <PluginsList plugins={plugins} filteredBy={this.state.filter} />
      </Layout>
    )
  }
}
