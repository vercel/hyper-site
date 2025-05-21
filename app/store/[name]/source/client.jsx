'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import { File, Directory } from 'components/icons'
import styles from 'styles/pages/store/source.module.css'

const formatFileName = (path) => path.replace(/^\/+|\/+$/g, '')

export default function SourceClient({ plugin, npmData, pluginMeta, cache }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeFile, setActiveFile] = useState(null)

  useEffect(() => {
    const filenameInQuery = searchParams.toString()
    setActiveFile(
      filenameInQuery
        ? `/${filenameInQuery}`
        : pluginMeta.files.find((file) => file.type === 'file').path
    )
  }, [searchParams, pluginMeta.files])

  const handleClickOnFile = (path) =>
    router.push(`/store/${plugin.name}/source?${formatFileName(path)}`)

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
              {file.path.replace(/^\/+|\/+$/g, '').split('/').pop()}
            </a>
          )}
          {file.type === 'directory' && (
            <>
              <label key={i} className={styles.file} htmlFor={`reveal-${file.path}`}>
                <Directory size={12} className={styles.icon} />
                {file.path.replace(/^\/+|\/+$/g, '').split('/').pop()}
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
