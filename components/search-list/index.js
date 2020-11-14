import Head from 'next/head'
import PluginsList from '../plugin-list'
import styles from './search-list.module.css'
import allPlugins from 'plugins'
import { useSearch } from 'lib/search-context'

export default () => {
  const { search: query } = useSearch()
  const plugins = allPlugins.filter(
    ({ name, description }) =>
      name.includes(query) || description.includes(query)
  )

  if (plugins.length > 0) {
    return (
      <>
        <Head>
          <title>{`Hyper™ Store - Searching for "${query}"`}</title>
        </Head>
        <PluginsList plugins={plugins} query={query} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{`Hyper™ Store - No results for "${query}"`}</title>
      </Head>
      <div className={styles.searchError}>
        Your search for "<b>{query}</b>" did not match any plugins or themes 😱{' '}
        <br />
        Make sure the search term is spelled correctly.
      </div>
    </>
  )
}
