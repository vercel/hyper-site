import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import plugins from '../../../plugins.json'
import Page from '../../../components/page'
import PluginInfo from '../../../components/PluginInfo'
import FileIcon from '../../../components/icons/file-icon.svg'
import DirectoryIcon from '../../../components/icons/directory-icon.svg'
import BackArrow from '../../../components/icons/back-arrow.svg'

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
    <div className="source__files">
      {root.map((file, i) => (
        <div key={i}>
          {file.type === 'file' && (
            <a
              className={`source__file ${
                file.path === activeFile ? 'source__file--is-active' : ''
              }`}
              onClick={() => handleClickOnFile(file.path)}
            >
              <FileIcon className="source__file-icon" />
              {file.path
                .replace(/^\/+|\/+$/g, '')
                .split('/')
                .pop()}
            </a>
          )}
          {file.type === 'directory' && (
            <div className="directory">
              <label
                key={i}
                className="source__file"
                htmlFor={`reveal-${file.path}`}
              >
                <DirectoryIcon className="source__file-icon" />
                {file.path
                  .replace(/^\/+|\/+$/g, '')
                  .split('/')
                  .pop()}
              </label>
              <input
                className="directory__toggle"
                type="checkbox"
                role="button"
                id={`reveal-${file.path}`}
              />
              <div className="directory__list">
                {renderFileTree(file.files)}
              </div>
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        .source__files {
          padding-right: 20px;
        }

        .source__file {
          color: #999999;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .source__file--is-active,
        .source__file:hover {
          color: white;
        }

        .source__file--is-active :global(.source__file-icon),
        .source__file:hover :global(.source__file-icon) {
          fill: white;
        }

        /* Hack to make styling apply to loaded SVG 😭 */
        :global(.source__file-icon) {
          margin-right: 12px;
          fill: #999;
          transition: fill 0.2s ease;
          min-width: 11px;
        }

        .directory__list {
          padding-left: 12px;
          display: none;
        }

        .directory__toggle {
          display: none;
        }

        .directory__toggle:checked + .directory__list {
          display: block;
        }
      `}</style>
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
          <header className="container">
            <Link href="/store/[id]" as={`/plugins/${pluginId}`}>
              <a className="plugin__back-link">
                <BackArrow width="7" height="14" />
              </a>
            </Link>
            <h1>{plugin.name}</h1>
          </header>
          <div className="source container">
            {renderFileTree(pluginContents.files)}
            <div className="source__contents">
              {fileContents && fileContents[activeFile] ? (
                <pre>{fileContents[activeFile]}</pre>
              ) : (
                <span className="source__contents-loading">
                  Contents loading...
                </span>
              )}
            </div>
          </div>
        </>
      )}
      <PluginInfo variant="source" plugin={plugin} />

      <style jsx>{`
        header {
          display: flex;
          margin-bottom: 24px;
          margin-top: 40px;
          width: 100%;
          justify-content: center;
          position: relative;
        }

        header h1 {
          font-size: 1.6rem;
          font-weight: 400;
          margin: 0;
        }

        .plugin__back-link {
          position: absolute;
          left: 0;
          height: 24px;
          width: 24px;
        }

        .plugin__back-link :global(svg) {
          transition: fill 0.2s ease;
        }

        .plugin__back-link:hover :global(svg) {
          fill: white;
        }

        .source {
          display: flex;
          overflow-x: hidden;
          padding-bottom: 64px;
        }

        .source__contents {
          font-size: 1.2rem;
          padding: 0 20px;
          overflow-x: auto;
        }

        .source__contents-loading {
          color: #999999;
        }

        header,
        .source {
          animation: appear 200ms ease;
        }

        @keyframes appear {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Page>
  )
}
