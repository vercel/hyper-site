import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/index.module.css'
import { getPluginPreviewImage } from 'lib/plugin'
import Image from 'next/image'

async function getPlugin(name) {
  const npmData = await (
    await fetch(`https://api.npms.io/v2/package/${name}`)
  ).json()

  const plugin = {
    ...plugins.find((e) => e.name === name),
    preview: getPluginPreviewImage(name),
  }

  return { plugin, npmData }
}

export async function generateStaticParams() {
  return plugins.map(({ name }) => ({ name }))
}

export default async function StoreIndexPage({ params }) {
  const { plugin, npmData } = await getPlugin(params.name)
  
  return (
    <Page
      title={`Hyper™ Store - ${plugin.name}`}
      description={plugin.description}
      image={plugin.preview}
    >
      <div className={styles.root}>
        <h1 className={styles.name}>{plugin.name}</h1>
        <p>{plugin.description}</p>
        <div className={styles.imageContainer}>
          {plugin.preview && (
            <>
              {plugin.preview.isGIF ? (
                <img
                  src={plugin.preview.src}
                  alt={`${plugin.name}'s preview image`}
                  width={plugin.preview.width}
                  height={plugin.preview.height}
                  className={styles.image}
                />
              ) : (
                <Image
                  width={plugin.preview.width}
                  height={plugin.preview.height}
                  src={plugin.preview.src}
                  alt={`${plugin.name}'s preview image`}
                />
              )}
            </>
          )}
        </div>
        <PluginInfo variant="description" npmData={npmData} />
      </div>
    </Page>
  )
}