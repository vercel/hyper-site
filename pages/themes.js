import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import Filter from '../components/Filter.js'
import SubmitButton from '../components/SubmitButton'
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
    if (res) {
      res.setHeader('Cache-Control', 'Cache-Control: s-maxage=7200')
    }
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
        <div className="plugins-heading container">
          <Filter
            handleFilterChange={this.handleFilterChange}
            currentFilter={this.state.filter}
          />
          <SubmitButton href="https://github.com/zeit/hyper-site/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store">
            Submit a Theme
          </SubmitButton>
        </div>
        <PluginsList plugins={themes} filteredBy={this.state.filter} />

        <style jsx>{`
          .plugins-heading {
            position: relative;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRouter(Themes)
