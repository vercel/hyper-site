import { useMemo } from 'react'
import Head from 'next/head'
import getPlugins from '../../lib/get-plugins'
import escapeHtml from 'escape-html'
import PluginsList from '../plugin-list'
import { useRouter } from 'next/router'
import styles from './search-list.module.css'

export default () => {
  const {
    query: { q: query }
  } = useRouter()
  const plugins = useMemo(() => getPlugins({ query: escapeHtml(query) }), [
    query
  ])

  if (plugins.length > 0) {
    return (
      <>
        <Head>
          <title>{`Hyper Store - Searching for "${query}"`}</title>
        </Head>
        <PluginsList plugins={plugins} query={query} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{`Hyper Store - No results for "${query}"`}</title>
      </Head>
      <div className={styles.searchError}>
        <p>
          Your search for "<b>{query}</b>" did not match any plugins or themes
          😱 <br />
          Make sure the search term is spelled correctly.
        </p>
      </div>
    </>
  )
}
