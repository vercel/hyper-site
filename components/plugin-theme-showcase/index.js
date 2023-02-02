import Link from 'next/link'
import Page from '../page'
import PluginsList from '../plugin-list'
import styles from './plugin-theme-showcase.module.css'

export default ({ plugins, variant, filter = 'featured' }) => (
  <Page title={`Hyper™ Store - ${variant === 'theme' ? 'Themes' : 'Plugins'}`}>
    <nav className={styles.nav}>
      <div className={styles.filters}>
        <Link
          href={variant === 'plugin' ? '/plugins' : '/themes'}
          className={filter === 'featured' ? styles.active : ''}>
          Featured
        </Link>
        <Link
          href={variant === 'plugin' ? '/plugins/newest' : '/themes/newest'}
          className={filter === 'newest' ? styles.active : ''}>
          Newest
        </Link>
      </div>
      <Link href="/store/submit" className={styles.submitButton}>

        {`Submit a ${variant === 'theme' ? 'theme' : 'plugin'}`}

      </Link>
    </nav>
    <PluginsList plugins={plugins} filteredBy={filter} />
  </Page>
)
