import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/index.module.css'
import { getPluginPreviewImage } from 'lib/plugin'
import Image from 'next/image'

export async function generateMetadata({ params }) {
  const plugin = plugins.find((e) => e.name === params.name)
  
  return {
    title: `Hyper™ Store - ${plugin.name}`,
    description: plugin.description,
    openGraph: {
      images: [plugin.preview?.src],
    },
  }
}

export default async function StorePage({ params }) {
  const npmData = await (
    await fetch(`https://api.npms.io/v2/package/${params.name}`, { 
      next: { revalidate: 60 * 60 * 24 } 
    })
  ).json()

  const plugin = {
    ...plugins.find((e) => e.name === params.name),
    preview: getPluginPreviewImage(params.name),
  }

  return (
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
                layout="responsive"
              />
            )}
          </>
        )}
      </div>
      <PluginInfo variant="description" npmData={npmData} />
    </div>
  )
}

export function generateStaticParams() {
  return plugins.map(({ name }) => ({
    name,
  }))
}
