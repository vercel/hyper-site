import { useState } from 'react'
import Head from 'next/head'
import Link from '../link'
import Page from '../page'
import PluginsList from '../plugin-list'
import styles from './plugin-theme-showcase.module.css'
import allPlugins from '../../plugins'
import { useRouter } from 'next/router'

export default ({ variant }) => {
  const router = useRouter()
  const plugins = allPlugins.filter(e => e.type === variant)
  const [filter, setFilter] = useState(router.query.filter ?? 'featured')

  const handleFilterChange = newFilter => {
    setFilter(newFilter)
    router.push({ pathname: router.pathname, query: { filter: newFilter } })
  }

  return (
    <Page>
      <Head>
        <title>{`Hyper Store - ${
          variant === 'theme' ? 'Themes' : 'Plugins'
        }`}</title>
      </Head>
      <nav className={styles.nav}>
        <div className={styles.filters}>
          <a
            onClick={() => handleFilterChange('featured')}
            className={filter === 'featured' ? styles.active : ''}
          >
            Featured
          </a>
          <a
            onClick={() => handleFilterChange('newest')}
            className={filter === 'newest' ? styles.active : ''}
          >
            Newest
          </a>
        </div>
        <Link
          className={styles.submitButton}
          href="https://github.com/zeit/hyper-site/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store"
        >
          {`Submit a ${variant === 'theme' ? 'theme' : 'plugin'}`}
        </Link>
      </nav>
      <PluginsList plugins={plugins} filteredBy={filter} />
    </Page>
  )
}
