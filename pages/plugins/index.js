import React from 'react'
import { withRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PluginsList from '../../components/PluginsList'
import Filter from '../../components/Filter'
import SubmitButton from '../../components/SubmitButton'
import getPlugins from '../../lib/get-plugins'

class Plugins extends React.Component {
  constructor() {
    super()

    this.state = {
      filter: 'featured'
    }
    this.plugins = getPlugins({ type: 'plugin' })
    this.handleFilterChange = this.handleFilterChange.bind(this)
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
    const { plugins } = this

    return (
      <Layout>
        <Head>
          <title>Hyper Store - Plugins</title>
        </Head>
        <div className="plugins-heading container">
          <Filter
            handleFilterChange={this.handleFilterChange}
            currentFilter={this.state.filter}
          />
          <SubmitButton href="https://github.com/zeit/hyper-site/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store">
            Submit a Plugin
          </SubmitButton>
        </div>
        <PluginsList plugins={plugins} filteredBy={this.state.filter} />

        <style jsx>{`
          .plugins-heading {
            position: relative;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withRouter(Plugins)
