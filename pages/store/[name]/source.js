import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import plugins from 'plugins.json'
import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import { File, Directory } from 'components/icons'
import useSWR from 'swr'
import styles from 'styles/pages/store/source.module.css'

const formatFileName = (path) => path.replace(/^\/+|\/+$/g, '')

export default ({ plugin, npmData, pluginMeta, cache }) => {
  const router = useRouter()
  const [activeFile, setActiveFile] = useState(null)

  // figuring out the initial activeFile from the url
  // or falling back to the first file of the plugin
  useEffect(() => {
    const filenameInQuery = router.asPath.split('?')[1]
    setActiveFile(
      filenameInQuery
        ? `/${filenameInQuery}`
        : pluginMeta.files.find((file) => file.type === 'file').path ?? null
    )
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

  return (
    <Page>
      <Head>
        <title>Hyper Store - Source of {plugin.name}</title>
      </Head>

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

const getFilePaths = (obj) => {
  if (obj.type === 'directory') {
    return getFilePaths(obj.files)
  }

  return obj.files.filter((f) => f.type === 'file').map((e) => e.path)
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://api.npms.io/v2/package/${params.name}`)
  const npmData = await res.json()

  const res2 = await fetch(`https://unpkg.com/${params.name}@latest/?meta`)
  const pluginMeta = await res2.json()

  const cache = {}

  let filePaths = []

  const getFilePaths = (root) => {
    root.files.forEach((file) => {
      if (file.type === 'directory') {
        filePaths = getFilePaths(file)
      } else if (file.type === 'file') {
        filePaths = [...filePaths, file.path]
      }
    })
  }

  getFilePaths(pluginMeta)

  await Promise.all(
    filePaths.map(async ({ path }) => {
      const res = await fetch(`https://unpkg.com/${params.name}@latest${path}`)
      cache[path] = await res.text()
    })
  )

  return {
    props: {
      plugin: plugins.find((e) => e.name === params.name),
      npmData,
      pluginMeta,
      cache,
    },
  }
}

export const getStaticPaths = () => ({
  paths: plugins.map(({ name }) => ({ params: { name } })).slice(0, 1),
  fallback: false,
})
