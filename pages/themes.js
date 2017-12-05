import React from 'react'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import Filter from '../components/Filter.js'
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
    const themes = await getPlugins('themes')
    return { themes }
  }

  handleFilterChange(filter) {
    this.setState({
      filter
    })
  }

  render() {
    const themes = this.props.themes.results
    return (
      <Layout>
        <Filter
          handleFilterChange={this.handleFilterChange}
          currentFilter={this.state.filter}
        />
        <PluginsList plugins={themes} filteredBy={this.state.filter} />
      </Layout>
    )
  }
}
