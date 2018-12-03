import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import Filter from '../components/Filter'
import getPlugins from '../lib/get-plugins'

class Plugins extends React.Component {
  constructor() {
    super()

    this.state = {
      filter: 'featured'
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  static async getInitialProps() {
    const plugins = await getPlugins({ type: 'plugin' })
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
    if (prevProps.router.asPath !== this.props.router.asPath) {
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
    return this.props.router.asPath.split('?')[1]
  }

  updateFilterURL(newFilter) {
    const href = `/plugins?${newFilter}`
    this.props.router.push(href, href, { shallow: true })
  }

  render() {
    const plugins = this.props.plugins
    return (
      <Layout>
        <Head>
          <title>Hyper Store - Plugins</title>
        </Head>
        <Filter
          handleFilterChange={this.handleFilterChange}
          currentFilter={this.state.filter}
        />
        <PluginsList plugins={plugins} filteredBy={this.state.filter} />
      </Layout>
    )
  }
}

export default withRouter(Plugins)
