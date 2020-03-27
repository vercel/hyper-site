import Head from 'next/head'
import Link from 'next/link'
import Page from '../page'
import PluginsList from '../plugin-list'
import styles from './plugin-theme-showcase.module.css'
import allPlugins from '../../plugins'

export default ({ variant, filter = 'featured' }) => {
  const plugins = allPlugins.filter((e) => e.type === variant)

  return (
    <Page>
      <Head>
        <title>{`Hyper Store - ${
          variant === 'theme' ? 'Themes' : 'Plugins'
        }`}</title>
      </Head>
      <nav className={styles.nav}>
        <div className={styles.filters}>
          <Link href={variant === 'plugin' ? '/plugins' : '/themes'}>
            <a className={filter === 'featured' ? styles.active : ''}>
              Featured
            </a>
          </Link>
          <Link
            href={variant === 'plugin' ? '/plugins/newest' : '/themes/newest'}
          >
            <a className={filter === 'newest' ? styles.active : ''}>Newest</a>
          </Link>
        </div>
        <a
          className={styles.submitButton}
          href="https://github.com/zeit/hyper-site/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store"
        >
          {`Submit a ${variant === 'theme' ? 'theme' : 'plugin'}`}
        </a>
      </nav>
      <PluginsList plugins={plugins} filteredBy={filter} />
    </Page>
  )
}
