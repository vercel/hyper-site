import Head from 'next/head'
import { useRouter } from 'next/router'
import Page from '../../../components/page'
import PluginInfo from '../../../components/PluginInfo'
import plugins from '../../../plugins.json'
import styles from '../../../styles/pages/plugins.module.css'

export default () => {
  const {
    query: { id }
  } = useRouter()
  const plugin = plugins.find(p => p.name === id)

  if (!plugin) {
    return (
      <Page>
        <div className={styles.notFound}>
          Couldn't find plugin <b>{id}</b>
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
        {typeof window === 'object' ? (
          <meta property="og:url" content={window.location.href} />
        ) : null}
        <meta property="og:image" content={plugin.preview} />
        <meta property="og:description" content={plugin.description} />
        <meta property="og:site_name" content="Hyper Store" />
      </Head>

      <div className={styles.root}>
        <h1>{plugin.name}</h1>
        <p>{plugin.description}</p>
        <img src={plugin.preview} alt={`${plugin.name} preview`} />
        <PluginInfo plugin={plugin} />
      </div>
    </Page>
  )
}
