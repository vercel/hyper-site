import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import PluginsList from '../components/PluginsList'
import Filter from '../components/Filter'
import SubmitButton from '../components/SubmitButton'
import { usePlugins, useFilter } from '../lib/plugins'

const Themes = () => {
  const plugins = usePlugins({ type: 'theme' })
  const [filter, setFilter] = useFilter('featured')

  return (
    <Layout>
      <Head>
        <title>Hyper Store - Plugins</title>
      </Head>
      <div className="plugins-heading container">
        <Filter handleFilterChange={setFilter} currentFilter={filter} />
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

export default Themes
