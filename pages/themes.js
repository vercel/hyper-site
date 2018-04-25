import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import Filter from '../components/Filter.js'
import getPlugins from '../lib/get-plugins'

class Themes extends React.Component {
  constructor() {
    super()

    this.state = {
      filter: 'featured'
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  static async getInitialProps() {
    const themes = await getPlugins({ type: 'theme' })
    return { themes }
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
    const href = `/themes?${newFilter}`
    this.props.router.push(href, href, { shallow: true })
  }

  render() {
    const themes = this.props.themes
    return (
      <Layout>
        <Head>
          <title>Hyper Store - Themes</title>
        </Head>
        <Filter
          handleFilterChange={this.handleFilterChange}
          currentFilter={this.state.filter}
        />
        <PluginsList plugins={themes} filteredBy={this.state.filter} />
      </Layout>
    )
  }
}

export default withRouter(Themes)
