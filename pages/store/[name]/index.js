import Head from 'next/head'
import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/index.module.css'

export default ({ plugin, npmData }) => (
  <Page>
    <Head>
      <title>Hyper Store - {plugin.name}</title>
      <meta property="og:title" content={`Hyper Store - ${plugin.name}`} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://hyper.is/store/${plugin.name}`}
      />
      <meta property="og:image" content={plugin.preview} />
      <meta property="og:description" content={plugin.description} />
      <meta property="og:site_name" content="Hyper Store" />
    </Head>

    <div className={styles.root}>
      <h1 className={styles.name}>{plugin.name}</h1>
      <p>{plugin.description}</p>
      <img src={plugin.preview} alt={`${plugin.name} preview`} />
      <PluginInfo variant="description" npmData={npmData} />
    </div>
  </Page>
)

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://api.npms.io/v2/package/${params.name}`)
  const npmData = await res.json()

  return {
    props: { plugin: plugins.find((e) => e.name === params.name), npmData },
  }
}

export const getStaticPaths = () => ({
  paths: plugins.map(({ name }) => ({ params: { name } })),
  fallback: false,
})
