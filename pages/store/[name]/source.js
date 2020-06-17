import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import plugins from 'plugins.json'
import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import { File, Directory } from 'components/icons'
import styles from 'styles/pages/store/source.module.css'

const formatFileName = (path) => path.replace(/^\/+|\/+$/g, '')

export default ({ plugin, npmData, pluginMeta, cache }) => {
  const router = useRouter()
  const [activeFile, setActiveFile] = useState(null)

  // figuring out the initial activeFile from the url
  // or falling back to the first file of the plugin
  useEffect(() => {
    if (!router.isFallback) {
      const filenameInQuery = router.asPath.split('?')[1]
      setActiveFile(
        filenameInQuery
          ? `/${filenameInQuery}`
          : pluginMeta.files.find((file) => file.type === 'file').path ?? null
      )
    }
  }, [router])

  const handleClickOnFile = (path) =>
    router.push(
      '/store/[name]/source',
      `/store/${plugin.name}/source?${formatFileName(path)}`
    )

  const renderFileTree = (root) => (
    <div className={styles.files}>
      {root.map((file, i) => (
        <div key={i}>
          {file.type === 'file' && (
            <a
              className={`${styles.file} ${
                file.path === activeFile ? styles.active : ''
              }`}
              onClick={() => handleClickOnFile(file.path)}
            >
              <File width={11} height={15} className={styles.icon} />
              {file.path
                .replace(/^\/+|\/+$/g, '')
                .split('/')
                .pop()}
            </a>
          )}
          {file.type === 'directory' && (
            <>
              <label
                key={i}
                className={styles.file}
                htmlFor={`reveal-${file.path}`}
              >
                <Directory size={12} className={styles.icon} />
                {file.path
                  .replace(/^\/+|\/+$/g, '')
                  .split('/')
                  .pop()}
              </label>
              <input
                className={styles.directoryToggle}
                type="checkbox"
                role="button"
                id={`reveal-${file.path}`}
              />
              <div className={styles.directoryList}>
                {renderFileTree(file.files)}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )

  if (router.isFallback) {
    return (
      <Page>
        <h1 className={styles.name}>Loading...</h1>
      </Page>
    )
  }

  return (
    <Page
      title={`Hyper™ Store - Source of ${plugin.name}`}
      description={plugin.description}
      image={plugin.preview}
    >
      <h1 className={styles.name}>{plugin.name}</h1>
      <div className={styles.container}>
        <>
          {renderFileTree(pluginMeta.files)}
          <div className={styles.content}>
            <pre>{cache[activeFile]}</pre>
          </div>
        </>
      </div>

      <PluginInfo variant="source" npmData={npmData} />
    </Page>
  )
}

export const getStaticProps = async ({ params }) => {
  const npmData = await (
    await fetch(`https://api.npms.io/v2/package/${params.name}`)
  ).json()

  const pluginMeta = await (
    await fetch(`https://unpkg.com/${params.name}@latest/?meta`)
  ).json()

  const filePaths = []

  ;(function getFilePaths(root) {
    for (const file of root.files) {
      if (file.type === 'directory') {
        getFilePaths(file)
      }
      if (file.type === 'file') {
        filePaths.push(file.path)
      }
    }
  })(pluginMeta)

  const cache = {}

  for (const path of filePaths) {
    const res = await fetch(`https://unpkg.com/${params.name}@latest${path}`)
    cache[path] = await res.text()
  }

  return {
    props: {
      plugin: plugins.find((e) => e.name === params.name),
      npmData,
      pluginMeta,
      cache,
    },
    unstable_revalidate: 60 * 60 * 24,
  }
}

export const getStaticPaths = () =>
  process.env.SKIP_STORE_SSG
    ? { paths: [], fallback: true }
    : {
        paths: plugins.map(({ name }) => ({ params: { name } })),
        fallback: false,
      }
