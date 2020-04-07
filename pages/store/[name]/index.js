import Head from 'next/head'
import Page from '../../../components/page'
import PluginInfo from '../../../components/plugin-info'
import allPlugins from '../../../plugins'
import styles from '../../../styles/pages/store/index.module.css'
import searchListStyles from '../../../components/search-list/search-list.module.css'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const plugin =
    router.query.name &&
    allPlugins.find(({ name }) => name === router.query.name)

  if (!plugin) {
    return (
      <Page>
        <div className={searchListStyles.searchError}>
          Couldn't find plugin "<b>{router.query.name}</b>"
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <Head>
        <title>Hyper Store - {plugin.name}</title>
        <meta property="og:title" content={`Hyper Store - ${plugin.name}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={plugin.preview} />
        <meta property="og:description" content={plugin.description} />
        <meta property="og:site_name" content="Hyper Store" />
      </Head>

      <div className={styles.root}>
        <h1 className={styles.name}>{plugin.name}</h1>
        <p>{plugin.description}</p>
        <img src={plugin.preview} alt={`${plugin.name} preview`} />
        <PluginInfo variant="description" pluginName={plugin.name} />
      </div>
    </Page>
  )
}
