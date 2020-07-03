import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/index.module.css'
import fs from 'fs'
import { join } from 'path'
import { CLOUDINARY_PREFIX } from 'lib/constants'

export default ({ plugin, npmData }) => (
  <Page
    title={`Hyper™ Store - ${plugin.name}`}
    description={plugin.description}
    image={plugin.preview}
  >
    <div className={styles.root}>
      <h1 className={styles.name}>{plugin.name}</h1>
      <p>{plugin.description}</p>
      <img src={plugin.preview} alt={`${plugin.name}'s preview image`} />
      <PluginInfo variant="description" npmData={npmData} />
    </div>
  </Page>
)

export const getStaticProps = async ({ params }) => {
  const npmData = await (
    await fetch(`https://api.npms.io/v2/package/${params.name}`)
  ).json()

  // get preview image name, e.g.: 'hyperpower.gif'
  const previewImageSrc = fs
    .readdirSync(join(process.cwd(), 'public', 'store'))
    .find((f) => f.includes(params.name))

  // full relative path to the image, this now can be used as an img's src
  const preview = `${CLOUDINARY_PREFIX}${previewImageSrc}`

  const plugin = { ...plugins.find((e) => e.name === params.name), preview }

  return {
    props: {
      plugin,
      npmData,
    },
    unstable_revalidate: 60 * 60 * 24,
  }
}

export const getStaticPaths = () => ({
  paths: plugins.map(({ name }) => ({ params: { name } })),
  fallback: false,
})
