'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import plugins from 'plugins.json'
import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import { File, Directory } from 'components/icons'
import styles from 'styles/pages/store/source.module.css'

const formatFileName = (path) => path.replace(/^\/+|\/+$/g, '')

async function getPluginData(name) {
  const plugin = plugins.find((e) => e.name === name)
  
  if (!plugin) {
    throw new Error('Plugin not found')
  }

  const npmData = await (
    await fetch(`https://api.npms.io/v2/package/${plugin.name}`)
  ).json()

  const pluginMeta = await (
    await fetch(`https://unpkg.com/${plugin.name}@latest/?meta`)
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
    const res = await fetch(`https://unpkg.com/${plugin.name}@latest${path}`)
    cache[path] = await res.text()
  }

  return { plugin, npmData, pluginMeta, cache }
}

export default function StoreSourcePage({ params }) {
  const searchParams = useSearchParams()
  const [pluginData, setPluginData] = useState(null)
  const [activeFile, setActiveFile] = useState(null)
  
  useEffect(() => {
    getPluginData(params.name).then(setPluginData)
  }, [params.name])

  // figuring out the initial activeFile from the url
  // or falling back to the first file of the plugin
  useEffect(() => {
    if (!pluginData) return
    
    const filenameInQuery = searchParams.get('file')

    setActiveFile(
      filenameInQuery
        ? `/${filenameInQuery}`
        : pluginData.pluginMeta.files.find((file) => file.type === 'file').path
    )
  }, [searchParams, pluginData])

  const handleClickOnFile = (path) => {
    const newUrl = new URL(window.location)
    newUrl.searchParams.set('file', formatFileName(path))
    window.history.pushState({}, '', newUrl)
    setActiveFile(path)
  }

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

  if (!pluginData) {
    return <div>Loading...</div>
  }

  const { plugin, npmData, pluginMeta, cache } = pluginData

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