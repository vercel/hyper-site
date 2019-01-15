import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import cachedFetch from '../lib/cached-json-fetch'
import getPackageInfo from '../lib/get-plugin'
import Layout from '../components/Layout'
import PluginInfo from '../components/PluginInfo'
import FileIcon from '../components/icons/file-icon.svg'
import DirectoryIcon from '../components/icons/directory-icon.svg'
import BackArrow from '../components/icons/back-arrow.svg'

export default class extends React.Component {
  static async getInitialProps({ query: { id }, res }) {
    let plugin, pluginContents

    try {
      plugin = await getPackageInfo(id, { meta: true })
      pluginContents = await cachedFetch(
        `https://unpkg.com/${id}@latest/?meta`,
        {},
        'json'
      )
    } catch (err) {
      console.error(err)
      res.redirect(`/plugins/${id}`)
    }

    if (res) {
      res.setHeader('Cache-Control', 'Cache-Control: s-maxage=7200')
    }

    return {
      pluginContents,
      id,
      plugin
    }
  }

  componentWillMount() {
    let initialFile
    const requestedFile = this.readFileFromURL()

    if (requestedFile) {
      initialFile = `/${requestedFile}`
    } else {
      initialFile = this.props.pluginContents.files.find(
        file => file.type === 'file'
      ).path
    }

    // Get Initial File
    this.updateActiveFile(initialFile)

    // Get Initial File Contents
    this.fetchFileContents(initialFile)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeFile === this.state.activeFile) {
      return
    }

    this.fetchFileContents(this.state.activeFile)
  }

  async getFileContents(file) {
    const response = await cachedFetch(
      `https://unpkg.com/${this.props.id}@latest${file}`,
      {},
      'text'
    )
    return response
  }

  updateActiveFile(file) {
    this.setState({
      activeFile: file
    })
  }

  formatFileName(file) {
    return file.replace(/^\/+|\/+$/g, '')
  }

  readFileFromURL() {
    return (
      Object.keys(this.props.url.query)[1] ||
      this.props.url.asPath.split('?')[1]
    )
  }

  updateURL(file) {
    const { url } = this.props
    const formattedFile = this.formatFileName(file)
    Router.push(
      `/source?id=${this.props.id}&${formattedFile}`,
      `source?${formattedFile}`,
      { shallow: true }
    )
  }

  async fetchFileContents(file) {
    const contents = await this.getFileContents(file)

    this.setState({
      fileContents: {
        [this.state.activeFile]: contents,
        ...this.state.fileContents
      }
    })
  }

  renderFileTree(root) {
    return (
      <div className="source__files">
        {root.map((file, i) => (
          <div key={i}>
            {file.type === 'file' && (
              <a
                className={`source__file ${
                  file.path === this.state.activeFile
                    ? 'source__file--is-active'
                    : ''
                }`}
                onClick={() => {
                  this.updateURL(file.path)
                  this.updateActiveFile(file.path)
                }}
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
                  {this.renderFileTree(file.files)}
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
  }

  render() {
    return (
      <Layout>
        <Head>
          {this.state.activeFile ? (
            <title>
              Hyper Store - "{this.formatFileName(this.state.activeFile)}" of{' '}
              {this.props.plugin.meta.name}
            </title>
          ) : (
            <title>Hyper Store - Source of {this.props.plugin.meta.name}</title>
          )}
        </Head>
        <header className="container">
          <Link
            href={`/plugin?id=${this.props.id}`}
            as={`/plugins/${this.props.id}`}
          >
            <a className="plugin__back-link">
              <BackArrow width="7" height="14" />
            </a>
          </Link>
          <h1>{this.props.plugin.meta.name}</h1>
        </header>
        <div className="source container">
          {this.renderFileTree(this.props.pluginContents.files)}

          <div className="source__contents">
            {this.state.fileContents &&
            this.state.fileContents[this.state.activeFile] ? (
              <pre>{this.state.fileContents[this.state.activeFile]}</pre>
            ) : (
              <span className="source__contents-loading">
                Contents loading...
              </span>
            )}
          </div>
        </div>

        <PluginInfo plugin={this.props.plugin} />

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
        `}</style>
      </Layout>
    )
  }
}
