import Head from 'next/head'
import Link from '../link'
import Page from '../page'
import PluginsList from '../plugin-list'
import { usePlugins, useFilter } from '../../lib/plugins'
import styles from './plugin-theme-showcase.module.css'

export default ({ variant }) => {
  const plugins = usePlugins({ type: variant })
  const [filter, setFilter] = useFilter('featured')

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
            onClick={() => setFilter('featured')}
            className={filter === 'featured' ? styles.active : ''}
          >
            Featured
          </a>
          <a
            onClick={() => setFilter('newest')}
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
