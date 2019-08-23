import React from 'react'
import { withRouter, useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PluginsList from '../../components/PluginsList'
import Filter from '../../components/Filter'
import SubmitButton from '../../components/SubmitButton'
import getPlugins from '../../lib/get-plugins'

const Plugins = () => {
  const router = useRouter()
  const [plugins, setPlugins] = React.useState([])
  const [filter, setFilter] = React.useState()
  const updateFilter = newFilter => {
    const href = `/plugins?${newFilter}`
    router.push(href, href, { shallow: true })
  }

  React.useEffect(() => {
    setPlugins(getPlugins({ type: 'plugin' }))
  }, [])

  React.useEffect(() => {
    setFilter(router.asPath.split('?')[1].replace('=', '') || 'featured')
  }, [router.asPath])

  return (
    <Layout>
      <Head>
        <title>Hyper Store - Plugins</title>
      </Head>
      <div className="plugins-heading container">
        <Filter handleFilterChange={updateFilter} currentFilter={filter} />
        <SubmitButton href="https://github.com/zeit/hyper-site/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store">
          Submit a Plugin
        </SubmitButton>
      </div>
      <PluginsList plugins={plugins} filteredBy={filter} />

      <style jsx>{`
        .plugins-heading {
          position: relative;
        }
      `}</style>
    </Layout>
  )
}

export default Plugins
