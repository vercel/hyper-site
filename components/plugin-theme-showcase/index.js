import Link from 'next/link'
import Page from '../page'
import PluginsList from '../plugin-list'
import styles from './plugin-theme-showcase.module.css'

export default ({ plugins, variant, filter = 'featured' }) => (
  <Page title={`Hyper™ Store - ${variant === 'theme' ? 'Themes' : 'Plugins'}`}>
    <nav className={styles.nav}>
      <div className={styles.filters}>
        <Link href={variant === 'plugin' ? '/plugins' : '/themes'}>
          <a className={filter === 'featured' ? styles.active : ''}>Featured</a>
        </Link>
        <Link
          href={variant === 'plugin' ? '/plugins/newest' : '/themes/newest'}
        >
          <a className={filter === 'newest' ? styles.active : ''}>Newest</a>
        </Link>
      </div>
      <Link href="/store/submit">
        <a className={styles.submitButton}>
          {`Submit a ${variant === 'theme' ? 'theme' : 'plugin'}`}
        </a>
      </Link>
    </nav>
    <PluginsList plugins={plugins} filteredBy={filter} />
  </Page>
)
