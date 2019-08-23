import React from 'react'
import { withRouter, useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PluginsList from '../../components/PluginsList'
import Filter from '../../components/Filter'
import SubmitButton from '../../components/SubmitButton'
import getPlugins from '../../lib/get-plugins'

const Plugins = () => {
  const plugins = React.useMemo(() => getPlugins({ type: 'plugin' }), [])
  const router = useRouter()
  const filterFromUrl = router.asPath.split('?')[1] || 'featured'
  const updateFilter = newFilter => {
    const href = `/plugins?${newFilter}`
    router.push(href, href, { shallow: true })
  }

  return (
    <Layout>
      <Head>
        <title>Hyper Store - Plugins</title>
      </Head>
      <div className="plugins-heading container">
        <Filter
          handleFilterChange={updateFilter}
          currentFilter={filterFromUrl}
        />
        <SubmitButton href="https://github.com/zeit/hyper-site/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store">
          Submit a Plugin
        </SubmitButton>
      </div>
      <PluginsList plugins={plugins} filteredBy={filterFromUrl} />

      <style jsx>{`
        .plugins-heading {
          position: relative;
        }
      `}</style>
    </Layout>
  )
}

export default Plugins
