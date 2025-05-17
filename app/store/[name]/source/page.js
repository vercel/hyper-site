import { getPluginPreviewImage } from 'lib/plugin'
import plugins from 'plugins'
import styles from 'styles/pages/store/source.module.css'

export async function generateMetadata({ params }) {
  const plugin = plugins.find((e) => e.name === params.name)
  
  return {
    title: `${plugin.name} Source - Hyper™ Store`,
    description: `Source code for ${plugin.name}`,
  }
}

export default async function SourcePage({ params }) {
  const res = await fetch(`https://registry.npmjs.org/${params.name}/latest`)
  const npmData = await res.json()
  
  const plugin = {
    ...plugins.find((e) => e.name === params.name),
    preview: getPluginPreviewImage(params.name),
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        {plugin.name} <span className={styles.version}>v{npmData.version}</span>
      </h1>
      <p className={styles.description}>{plugin.description}</p>
      
      <div className={styles.sourceContainer}>
        {/* Source code display logic */}
        <pre className={styles.source}>
          <code>
            {/* Display source code here */}
            {`// Source code for ${plugin.name}`}
          </code>
        </pre>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return plugins.map(({ name }) => ({
    name,
  }))
}
