import Head from 'next/head'
import Page from '../../../components/page'
import PluginInfo from '../../../components/PluginInfo'
import plugins from '../../../plugins'
import styles from '../../../styles/pages/store/index.module.css'

export default ({ plugin }) => (
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
        <PluginInfo variant="description" plugin={plugin} />
      </div>
    </Page>
  )

export const getStaticProps = ({ params }) => ({
  props: { plugin: plugins.find(e => e.name === params.name) }
})

export const getStaticPaths = () => ({
  paths: plugins.map(({ name }) => ({ params: { name } })),
  fallback: false
})
