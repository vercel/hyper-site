'use client'

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
        <PluginsList plugins={plugins} query={query} />
      </>
    )
  }

  return (
    <>
      <div className={styles.searchError}>
        Your search for "<b>{query}</b>" did not match any plugins or themes 😱{' '}
        <br />
        Make sure the search term is spelled correctly.
      </div>
    </>
  )
}
