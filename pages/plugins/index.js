import Head from 'next/head'
import Page from '../../components/Page'
import PluginsList from '../../components/PluginsList'
import Filter from '../../components/Filter'
import SubmitButton from '../../components/SubmitButton'
import { usePlugins, useFilter } from '../../lib/plugins'

const Plugins = () => {
  const plugins = usePlugins({ type: 'plugin' })
  const [filter, setFilter] = useFilter('featured')

  return (
    <Page>
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
    </Page>
  )
}

export default Plugins
