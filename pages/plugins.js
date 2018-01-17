import React from 'react'
import Router from 'next/router'
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

  componentWillMount() {
    const requestedFilter = this.readFilterFromURL()
    if (requestedFilter && this.state.filter !== requestedFilter) {
      this.setState({
        filter: requestedFilter
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url.asPath !== this.props.url.asPath) {
      const newFilter = this.readFilterFromURL()
      this.handleFilterChange(newFilter)
    }
  }

  handleFilterChange(newFilter) {
    if (newFilter) {
      this.updateFilterURL(newFilter)
    }

    this.setState({
      filter: newFilter || 'featured'
    })
  }

  readFilterFromURL() {
    return this.props.url.asPath.split('?')[1]
  }

  updateFilterURL(newFilter) {
    const href = `/plugins?${newFilter}`
    Router.push(href, href, { shallow: true })
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
