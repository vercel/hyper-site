import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import plugins from '../../../plugins.json'
import Page from '../../../components/page'
import PluginInfo from '../../../components/PluginInfo'
import FileIcon from '../../../components/icons/file-icon.svg'
import DirectoryIcon from '../../../components/icons/directory-icon.svg'
import styles from '../../../styles/pages/store/source.module.css'

const formatFileName = path => path.replace(/^\/+|\/+$/g, '')

export default () => {
  const router = useRouter()
  const pluginId = router.query.id
  const plugin = plugins.find(p => p.name === pluginId)
  const [pluginContents, setPluginContents] = useState(null)
  const [activeFile, setActiveFile] = useState(null)
  const [fileContents, setFileContents] = useState(null)

  useEffect(() => {
    if (pluginId) {
      fetch(`https://unpkg.com/${pluginId}@latest/?meta`)
        .then(r => {
          if (!r.ok) {
            throw new Error('failed fetch')
          }
          return r.json()
        })
        .then(d => setPluginContents(d))
        .catch(() => router.replace(`/store/${pluginId}`))
    }
  }, [pluginId])

  useEffect(() => {
    if (pluginContents && router.asPath) {
      const path = router.asPath.split('?')[1]
      const requestedFile = path && path.replace('=', '')
      setActiveFile(
        requestedFile
          ? `/${requestedFile}`
          : pluginContents.files.find(file => file.type === 'file').path
      )
    }
  }, [pluginContents, router.asPath])

  useEffect(() => {
    if (activeFile) {
      fetch(`https://unpkg.com/${pluginId}@latest${activeFile}`)
        .then(r => {
          if (!r.ok) {
            throw new Error('error fetching file')
          }
          return r.text()
        })
        .then(d => setFileContents({ ...fileContents, [activeFile]: d }))
        .catch(e => console.log(e))
    }
  }, [activeFile])

  const handleClickOnFile = path =>
    router.push(
      '/store/[id]/source',
      `/store/${pluginId}/source?${formatFileName(path)}`
    )

  const renderFileTree = root => (
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
              <FileIcon className={styles.icon} />
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
                <DirectoryIcon className={styles.icon} />
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

  if (!plugin) {
    return <Page />
  }

  return (
    <Page>
      <Head>
        <title>Hyper Store - Source of {plugin.name}</title>
      </Head>
      {fileContents && (
        <>
          <header className={styles.header}>
            <h1>{plugin.name}</h1>
          </header>
          <div className={styles.container}>
            {renderFileTree(pluginContents.files)}
            <div className={styles.content}>
              {fileContents && fileContents[activeFile] ? (
                <pre>{fileContents[activeFile]}</pre>
              ) : (
                <span className={styles.loading}>Contents loading...</span>
              )}
            </div>
          </div>
        </>
      )}
      <PluginInfo variant="source" plugin={plugin} />
    </Page>
  )
}
