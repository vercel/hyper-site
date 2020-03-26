import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import plugins from '../../../plugins.json'
import Page from '../../../components/page'
import PluginInfo from '../../../components/plugin-info'
import { File, Directory } from '../../../components/icons'
import useSWR from 'swr'
import styles from '../../../styles/pages/store/source.module.css'

const formatFileName = (path) => path.replace(/^\/+|\/+$/g, '')

export default () => {
  const router = useRouter()
  const pluginId = router.query.name
  const plugin = plugins.find((p) => p.name === pluginId)
  const { data: pluginMeta } = useSWR(
    pluginId ? `https://unpkg.com/${pluginId}@latest/?meta` : null
  )
  const [activeFile, setActiveFile] = useState(null)
  const [cache, setCache] = useState(null)

  // figuring out the initial activeFile from the url
  // or falling back to the first file of the plugin
  useEffect(() => {
    const filenameInQuery = router.asPath.split('?')[1]
    setActiveFile(
      filenameInQuery
        ? `/${filenameInQuery}`
        : pluginMeta?.files.find((file) => file.type === 'file').path ?? null
    )
  }, [pluginMeta, router])

  // fetching file's content and caching it
  useEffect(() => {
    if (activeFile) {
      fetch(`https://unpkg.com/${pluginId}@latest${activeFile}`)
        .then((r) => {
          if (!r.ok) {
            throw new Error('error fetching file')
          }
          return r.text()
        })
        .then((d) => setCache({ ...cache, [activeFile]: d }))
        .catch((e) => console.log(e))
    }
  }, [activeFile])

  const handleClickOnFile = (path) =>
    router.push(
      '/store/[name]/source',
      `/store/${pluginId}/source?${formatFileName(path)}`
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

  // pluginId is first present on rehydration as it comes from the query
  if (!pluginId) {
    return null
  }

  return (
    <Page>
      <Head>
        <title>Hyper Store - Source of {plugin.name}</title>
      </Head>

      <h1 className={styles.name}>{plugin.name}</h1>
      <div className={styles.container}>
        {pluginMeta && cache ? (
          <>
            {renderFileTree(pluginMeta.files)}
            <div className={styles.content}>
              {cache[activeFile] ? (
                <pre>{cache[activeFile]}</pre>
              ) : (
                <span className={styles.fileLoading}>Contents loading...</span>
              )}
            </div>
          </>
        ) : (
          <span className={styles.pluginLoading}>Loading source code...</span>
        )}
      </div>

      <PluginInfo variant="source" pluginName={plugin.name} />
    </Page>
  )
}
