import React from 'react'
import Layout from '../components/Layout.js'
import Footer from '../components/Footer.js'
import Head from 'next/head'
import DownloadButton from '../components/DownloadButton.js'

import cachedFetch from '../lib/cached-json-fetch'

const Path = ({ os, path }) => (
  <React.Fragment>
    <code>
      {(() => {
        switch (os) {
          case 'mac':
            return '~/Library/Application Support/Hyper/'
          case 'windows':
            return '$Env:AppData/Hyper/'
          case 'linux':
            return '~/.config/Hyper/'
          default:
            return ''
        }
      })() + path}
    </code>
    <style jsx>{`
      code:before,
      code:after {
        content: '\\0060';
      }
    `}</style>
  </React.Fragment>
)

const PathLink = ({ os, path, type }) => (
  <a href={`#${type}-location`}>
    <Path os={os} path={path} />
  </a>
)

export default class Index extends React.Component {
  static async getInitialProps({ req, res }) {
    const userAgent =
      typeof window !== 'undefined'
        ? navigator.userAgent
        : req.headers['user-agent']
    let OS

    if (
      /Mac/.test(userAgent) &&
      !/iPhone/.test(userAgent) &&
      !/iPad/.test(userAgent)
    ) {
      OS = 'mac'
    } else if (/Windows/.test(userAgent)) {
      OS = 'windows'
    } else if (/Fedora/.test(userAgent)) {
      OS = 'fedora'
    } else if (/Ubuntu/.test(userAgent)) {
      OS = 'ubuntu'
    } else if (/Linux/.test(userAgent)) {
      OS = 'linux'
    }

    const releases = await cachedFetch(
      `https://api.github.com/repos/zeit/hyper/releases`,
      {},
      'json'
    )

    let stable = releases.find(release => !release.prerelease)

    return { OS, stable }
  }

  render() {
    const { stable } = this.props
    return (
      <Layout>
        <Head>
          <title>Hyper™</title>
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:site" content="@zeithq" />
          <meta property="og:title" content="Hyper™" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://hyper.is" />
          <meta property="description" content="Hyper™: HTML/JS/CSS terminal" />
          <meta
            property="og:description"
            content="Hyper™: HTML/JS/CSS terminal"
          />
          <meta
            property="og:image"
            content="https://hyper.is/static/hyper.png"
          />
        </Head>

        <div id="main">
          <div id="top">
            <div id="loading" />
            <div id="logo">
              <svg width="63" height="60" fill="none">
                <mask id="a" fill="#fff">
                  <path d="M62.22 40.97v2.18L62.19 45a26.32 26.32 0 0 1-.36 3.99 12.77 12.77 0 0 1-6.92 9.38 13.71 13.71 0 0 1-3.83 1.26c-1.34.23-2.7.31-4.04.35-2.6.03-3.33.03-4.07.03H19.25c-2.82 0-3.44-.01-4.06-.03-1.35-.04-2.71-.12-4.04-.35a13.71 13.71 0 0 1-3.85-1.26A12.9 12.9 0 0 1 .4 48.98a26.33 26.33 0 0 1-.36-4 81.1 81.1 0 0 1-.02-1.83L0 40.97V19.03v-2.18l.03-1.84c.04-1.33.12-2.67.36-4A12.76 12.76 0 0 1 7.3 1.64 13.71 13.71 0 0 1 11.14.39c1.33-.23 2.69-.31 4.04-.35C17.78 0 18.52 0 19.25 0H42.37h-8.95 9.55c2.83 0 3.45.01 4.07.03 1.34.04 2.7.12 4.04.35 1.35.24 2.61.64 3.84 1.26a12.89 12.89 0 0 1 6.91 9.38c.24 1.32.32 2.66.36 4 .02.6.02 1.22.03 1.83v24.12z" />
                </mask>
                <path
                  d="M62.22 40.97v2.18L62.19 45a26.32 26.32 0 0 1-.36 3.99 12.77 12.77 0 0 1-6.92 9.38 13.71 13.71 0 0 1-3.83 1.26c-1.34.23-2.7.31-4.04.35-2.6.03-3.33.03-4.07.03H19.25c-2.82 0-3.44-.01-4.06-.03-1.35-.04-2.71-.12-4.04-.35a13.71 13.71 0 0 1-3.85-1.26A12.9 12.9 0 0 1 .4 48.98a26.33 26.33 0 0 1-.36-4 81.1 81.1 0 0 1-.02-1.83L0 40.97V19.03v-2.18l.03-1.84c.04-1.33.12-2.67.36-4A12.76 12.76 0 0 1 7.3 1.64 13.71 13.71 0 0 1 11.14.39c1.33-.23 2.69-.31 4.04-.35C17.78 0 18.52 0 19.25 0H42.37h-8.95 9.55c2.83 0 3.45.01 4.07.03 1.34.04 2.7.12 4.04.35 1.35.24 2.61.64 3.84 1.26a12.89 12.89 0 0 1 6.91 9.38c.24 1.32.32 2.66.36 4 .02.6.02 1.22.03 1.83v24.12z"
                  fill="#000"
                />
                <path
                  d="M62.22 43.15l-3.5-.02 3.5.02zM62.19 45l-3.5-.1 3.5.1zm-.36 3.99l-3.44-.63 3.44.63zm-1.26 3.8l-3.11-1.6 3.1 1.6zm-2.38 3.23l2.46 2.5L58.2 56zm-3.27 2.35l-1.57-3.12 1.57 3.12zm-3.84 1.26l-.61-3.45.6 3.45zm-4.04.35l.04 3.5h.05l-.1-3.5zM19.25 60l-.01 3.5h.01V60zm-4.06-.03l.1-3.5-.1 3.5zm-4.04-.35l.6-3.45-.6 3.45zM7.3 58.36l1.58-3.12-1.58 3.12zm-3.27-2.35l-2.46 2.5L4.03 56zm-2.38-3.23l-3.1 1.6 3.1-1.6zM.4 48.98l-3.45.63 3.45-.63zm-.36-4l3.5-.09-3.5.1zm-.02-1.83l3.5-.02-3.5.02zm0-26.3l3.5.03v-.01L0 16.85zm.02-1.84l3.5.1-3.5-.1zm.36-4l-3.45-.62 3.45.63zm1.26-3.79l-3.1-1.6 3.1 1.6zm2.38-3.23L6.5 6.48l-2.46-2.5zM7.3 1.64l1.58 3.12L7.3 1.64zM11.15.38l.6 3.45-.6-3.45zm4.04-.35l-.04-3.5h-.06l.1 3.5zM42.37 0v3.5-7V0zm-8.95 0v-3.5 7V0zm9.55 0l.01-3.5V0zm4.07.03l-.1 3.5.1-3.5zm4.04.35l-.61 3.45.6-3.45zm3.84 1.26l-1.58 3.12 1.58-3.12zm3.27 2.35l-2.46 2.48L58.2 4zm2.38 3.23l-3.11 1.6 3.1-1.6zm1.26 3.8l-3.44.62 3.44-.62zm.36 4l-3.5.09 3.5-.1zm.03 1.83l-3.5.02 3.5-.02zm-3.5 24.12v2.16l7 .04v-2.2h-7zm0 2.16c0 .6-.01 1.18-.03 1.76l7 .2.03-1.92-7-.04zm-.03 1.76c-.03 1.27-.1 2.41-.3 3.46l6.89 1.26c.29-1.58.37-3.14.4-4.53l-6.99-.19zm-.3 3.47a9.84 9.84 0 0 1-.93 2.82l6.22 3.2c.8-1.56 1.3-3.14 1.6-4.77l-6.89-1.25zm-.93 2.82a9.27 9.27 0 0 1-1.73 2.35l4.92 4.97c1.22-1.2 2.25-2.6 3.03-4.12l-6.22-3.2zm-1.73 2.35c-.7.69-1.5 1.27-2.38 1.7l3.14 6.26a16.42 16.42 0 0 0 4.16-2.99l-4.92-4.97zm-2.39 1.7c-.88.46-1.81.75-2.87.94l1.22 6.9a17.2 17.2 0 0 0 4.8-1.58l-3.15-6.25zm-2.87.94c-1.08.2-2.24.27-3.53.3l.19 7c1.4-.04 2.97-.12 4.56-.4l-1.22-6.9zm-3.48.3c-2.58.03-3.3.03-4.02.03v7c.75 0 1.5 0 4.1-.03l-.08-7zm-4.02.03H27.7v7h15.28v-7zm-15.28 0h-8.44v7h8.44v-7zm-8.43 0c-2.84 0-3.41-.01-3.98-.03l-.19 7c.67.02 1.34.02 4.15.03l.02-7zm-3.98-.03c-1.29-.03-2.45-.1-3.52-.3l-1.23 6.9c1.6.28 3.16.36 4.56.4l.2-7zm-3.52-.3a10.22 10.22 0 0 1-2.88-.93l-3.15 6.25a17.2 17.2 0 0 0 4.8 1.57l1.23-6.89zm-2.88-.93a9.4 9.4 0 0 1-2.39-1.71L1.57 58.5a16.4 16.4 0 0 0 4.16 3l3.15-6.26zm-2.39-1.71a9.3 9.3 0 0 1-1.73-2.35l-6.22 3.2a16.3 16.3 0 0 0 3.03 4.12l4.92-4.97zm-1.72-2.35a9.9 9.9 0 0 1-.94-2.83l-6.89 1.26c.3 1.63.8 3.21 1.6 4.77l6.23-3.2zm-.94-2.83c-.19-1.05-.26-2.18-.3-3.46l-7 .2c.04 1.38.13 2.94.41 4.52l6.9-1.26zm-.3-3.46l-.02-1.76-7 .04c0 .63 0 1.27.02 1.91l7-.2zm-.02-1.77l-.01-2.15h-7v2.2l7-.05zm-.01-2.15v-7.23h-7v7.23h7zm0-7.23v-7.48h-7v7.48h7zm0-7.48v-7.23h-7v7.23h7zm0-7.23v-2.15l-7-.06v2.21h7zm0-2.16c0-.6.02-1.18.03-1.76l-7-.2-.02 1.92 7 .04zm.03-1.76c.04-1.28.11-2.41.3-3.47l-6.89-1.25a29.75 29.75 0 0 0-.4 4.53l7 .19zm.3-3.46a9.9 9.9 0 0 1 .94-2.83l-6.23-3.2c-.8 1.56-1.3 3.14-1.6 4.77l6.9 1.26zm.94-2.83a9.26 9.26 0 0 1 1.72-2.34L1.57 1.49a16.26 16.26 0 0 0-3.03 4.13l6.23 3.2zm1.72-2.35c.7-.69 1.5-1.26 2.39-1.7L5.73-1.5A16.37 16.37 0 0 0 1.57 1.5l4.92 4.97zm2.39-1.7c.89-.46 1.81-.75 2.88-.94l-1.23-6.9c-1.64.3-3.23.79-4.8 1.58l3.15 6.25zm2.88-.94c1.07-.2 2.23-.27 3.52-.3l-.19-7c-1.4.04-2.97.12-4.56.4l1.23 6.9zm3.47-.3c2.58-.03 3.3-.03 4.02-.03v-7c-.75 0-1.5 0-4.1.03l.08 7zm4.02-.03h8.44v-7h-8.44v7zm8.44 0h14.68v-7H27.7v7zm14.68-7h-8.95v7h8.95v-7zm-8.95 7h9.55v-7h-9.55v7zm9.54 0c2.84 0 3.41.01 3.98.03l.2-7c-.68-.02-1.35-.02-4.16-.03l-.02 7zm3.98.03c1.3.03 2.45.1 3.53.3l1.22-6.9a30.67 30.67 0 0 0-4.56-.4l-.19 7zm3.53.3c1.06.19 1.99.48 2.87.93l3.15-6.25a17.2 17.2 0 0 0-4.8-1.57l-1.22 6.89zm2.88.93a9.39 9.39 0 0 1 2.38 1.71l4.92-4.97a16.39 16.39 0 0 0-4.16-3l-3.14 6.26zm2.38 1.72c.7.68 1.28 1.48 1.73 2.34l6.22-3.2a16.23 16.23 0 0 0-3.03-4.13l-4.92 4.99zm1.73 2.34c.45.87.74 1.78.93 2.82l6.89-1.25c-.3-1.63-.8-3.21-1.6-4.77l-6.22 3.2zm.93 2.82c.2 1.06.27 2.2.3 3.47l7-.2c-.04-1.38-.12-2.94-.41-4.52l-6.89 1.25zm.3 3.47c.02.58.02 1.16.03 1.76l7-.04-.03-1.91-7 .2zm.03 1.76v2.16h7v-2.2l-7 .04zm0 2.16v7.23h7v-7.23h-7zm0 7.23v7.48h7v-7.48h-7zm0 7.48v7.23h7v-7.23h-7z"
                  fill="url(#paint0_linear)"
                  mask="url(#a)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.48 25.83c0-.27.22-.5.5-.5h9.2c.28 0 .5.23.5.5v1a.5.5 0 0 1-.5.5h-9.2a.5.5 0 0 1-.5-.5v-1zM21.05 20.19a.3.3 0 0 0-.07-.49l-3.57-1.9a.3.3 0 0 1-.14-.38l2.46-6.12c.11-.29-.25-.54-.48-.33l-7.75 7a.3.3 0 0 0 .03.48l3.44 2.33a.3.3 0 0 1 .11.36l-2.24 5.71c-.12.3.24.54.48.33l7.73-7z"
                  fill="#fff"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="32.22"
                    x2="32.22"
                    y2="63.33"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F743B6" />
                    <stop offset="1" stopColor="#FCC043" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div id="video">
              <video
                id="vid"
                src="static/hyperapp.mp4"
                height="100%"
                autoPlay
                muted
              />
            </div>

            <div className="top-content">
              <div className="top-download">
                <DownloadButton os={this.props.OS} />
                <span className="other-downloads">
                  <a href="#installation">Other platforms</a>
                </span>
              </div>
              <div id="arrow">
                <a href="#installation">
                  <img src="static/arrow.svg" width={18} />
                </a>
              </div>
            </div>
          </div>

          <div id="content">
            {/*
                Installation
            */}
            <h2 id="installation">
              <a href="#installation">
                Installation <br />
                <span className="latest-version-small">
                  latest version: {stable.tag_name}
                </span>
              </a>
            </h2>
            <div className="table">
              <table id="installation-table" className="offset-header">
                <tbody>
                  <tr>
                    <td
                      style={{ width: '33.333%' }}
                      className="invisible-top-left"
                    />
                    <td style={{ width: '33.333%' }}>64-bit</td>
                  </tr>
                  <tr>
                    <td>
                      <b>macOS</b> (.app)
                    </td>
                    <td
                      id="td-mac-os"
                      className={this.props.OS === 'mac' ? 'highlighted' : ''}
                    >
                      <a href="https://releases.hyper.is/download/mac">
                        <img src="static/download-icon.svg" />
                        <span className="latest-version">
                          {stable.tag_name}
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Windows</b> (.exe)
                    </td>
                    <td
                      id="td-win"
                      className={
                        this.props.OS === 'windows' ? 'highlighted' : ''
                      }
                    >
                      <a href="https://releases.hyper.is/download/win">
                        <img src="static/download-icon.svg" />
                        <span className="latest-version">
                          {stable.tag_name}
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Debian</b> (.deb)
                    </td>
                    <td
                      id="td-debian"
                      className={
                        this.props.OS === 'ubuntu' ? 'highlighted' : ''
                      }
                    >
                      <a href="https://releases.hyper.is/download/deb">
                        <img src="static/download-icon.svg" />
                        <span className="latest-version">
                          {stable.tag_name}
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Fedora</b> (.rpm)
                    </td>
                    <td
                      id="td-fedora"
                      className={
                        this.props.OS === 'fedora' ? 'highlighted' : ''
                      }
                    >
                      <a href="https://releases.hyper.is/download/rpm">
                        <img src="static/download-icon.svg" />
                        <span className="latest-version">
                          {stable.tag_name}
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Other Linux distros</b> (.AppImage)
                    </td>
                    <td
                      id="td-appimage"
                      className={this.props.OS === 'linux' ? 'highlighted' : ''}
                    >
                      <a href="https://releases.hyper.is/download/AppImage">
                        <img src="static/download-icon.svg" />
                        <span className="latest-version">
                          {stable.tag_name}
                        </span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*
              Project Goals
            */}
            <h2 id="hashtag-goals">
              <a href="#hashtag-goals">Project Goals</a>
            </h2>
            <p>
              The goal of the project is to create a beautiful and extensible
              experience for command-line interface users, built on open web
              standards. In the beginning, our focus will be primarily around
              speed, stability and the development of the correct API for
              extension authors.
            </p>
            <p>
              In the future, we anticipate the community will come up with
              innovative additions to enhance what could be the simplest, most
              powerful and well-tested interface for productivity.
            </p>

            {/*
              Extensions
            */}
            <h2 id="extensions">
              <a href="#extensions">Extensions</a>
            </h2>
            <p>
              Extensions are available on npm. We encourage everyone to include{' '}
              <code>hyper</code> in the <code>keywords</code>
              field in <code>package.json</code>.
            </p>
            <pre>
              <code>$ npm search hyper</code>
            </pre>
            <p>
              Then edit{' '}
              <PathLink os={this.props.OS} path=".hyper.js" type="config" /> and
              add it to <code>plugins</code>
            </p>
            <pre>
              <code>
                module.exports = {'{'}
                {'\n'}
                {'\n'}
                {'  '}config: {'{'} /*... */ {'}'},{'\n'}
                {'\n'}
                {'  '}plugins: [{'\n'}
                {'    '}
                <b>"hyperpower"</b>
                {'\n'}
                {'  '}]{'\n'}
                {'\n'}
                {'}'};
              </code>
            </pre>
            <p>
              <code>Hyper</code> will show a notification when your modules are
              installed to{' '}
              <PathLink
                os={this.props.OS}
                path=".hyper_plugins"
                type="plugins"
              />
              .
            </p>

            {/*
              Keymaps
            */}
            <h2 id="keymaps">
              <a href="#keymaps">Keymaps</a>
            </h2>
            <p>
              All command keys can be changed. In order to change them, edit{' '}
              <PathLink os={this.props.OS} path=".hyper.js" type="config" /> and
              add your desired change to <code>keymaps</code>.
            </p>
            <p> Then Hyper will change the default with your custom change.</p>
            <p>
              Example: <code>'window:devtools': 'Cmd+Alt+O'</code>{' '}
            </p>

            <pre>
              <code>
                module.exports = {'{'}
                {'\n'}
                {'  '}config: {'{'} /*... */ {'}'},{'\n'}
                {'\n'}
                {'  '}keymaps: {'{'}
                {'\n'}
                {'    '}'window:devtools': 'cmd+alt+o'{'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'\n'}
                {'}'};
              </code>
            </pre>

            <h4>Default keymaps: </h4>
            <div className="table">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <a href="https://github.com/zeit/hyper/blob/master/app/keymaps/win32.json">
                        Windows
                      </a>
                    </td>
                    <td>
                      <a href="https://github.com/zeit/hyper/blob/master/app/keymaps/linux.json">
                        Linux
                      </a>
                    </td>
                    <td>
                      <a href="https://github.com/zeit/hyper/blob/master/app/keymaps/darwin.json">
                        macOS
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*
              Configuration
            */}
            <h2 id="cfg">
              <a href="#cfg">Configuration</a>
            </h2>
            <h3 id="config-location">
              <a href="#config-location">Config location</a>
            </h3>
            <div className="table">
              <table id="config-paths-table" className="offset-header">
                <tr>
                  <td>
                    <strong>macOS</strong>
                  </td>
                  <td>
                    <Path os="mac" path=".hyper.js" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Windows</strong>
                  </td>
                  <td>
                    <Path os="windows" path=".hyper.js" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Linux</strong>
                  </td>
                  <td>
                    <Path os="linux" path=".hyper.js" />
                  </td>
                </tr>
              </table>
            </div>
            <p>
              Note: config at <code>~/.hyper.js</code> still supported, but will
              be ignored, if config in application directory present. Otherwise
              it will be moved to the application directory at first run.
            </p>
            <p>
              The <code>config</code> object seen above in{' '}
              <PathLink path=".hyper.js" type="config" /> admits the following
            </p>
            <div className="table large">
              <table className="config">
                <thead>
                  <tr>
                    <td>Property</td>
                    <td>Default</td>
                    <td>Description</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>updateChannel</code>
                    </td>
                    <td>"stable"</td>
                    <td>The update channel to receive updates from</td>
                  </tr>
                  <tr>
                    <td>
                      <code>fontSize</code>
                    </td>
                    <td>12</td>
                    <td>The default size in pixels for the terminal</td>
                  </tr>
                  <tr>
                    <td>
                      <code>fontFamily</code>
                    </td>
                    <td>
                      "Menlo, DejaVu Sans Mono, Lucida Console, monospace"
                    </td>
                    <td>The font family to use with optional fallbacks</td>
                  </tr>
                  <tr>
                    <td>
                      <code>uiFontFamily</code>
                    </td>
                    <td>
                      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, ..."
                    </td>
                    <td>
                      The font family to use for the UI with optional fallbacks
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>fontWeight</code>
                    </td>
                    <td>"normal"</td>
                    <td>The default font weight: "normal" or "bold"</td>
                  </tr>
                  <tr>
                    <td>
                      <code>fontWeightBold</code>
                    </td>
                    <td>"bold"</td>
                    <td>
                      The font weight for bold characters: "normal" or "bold"
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>cursorColor</code>
                    </td>
                    <td>"rgba(248,28,229,0.8)"</td>
                    <td>The color of the caret in the terminal</td>
                  </tr>
                  <tr>
                    <td>
                      <code>cursorAccentColor</code>
                    </td>
                    <td>"#000"</td>
                    <td>The text color under BLOCK cursor</td>
                  </tr>
                  <tr>
                    <td>
                      <code>cursorShape</code>
                    </td>
                    <td>"BLOCK"</td>
                    <td>
                      The shape of the caret in the terminal. Available options
                      are: 'BEAM', 'UNDERLINE', 'BLOCK'
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>cursorBlink</code>
                    </td>
                    <td>"false"</td>
                    <td>If true, cursor will blink</td>
                  </tr>
                  <tr>
                    <td>
                      <code>foregroundColor</code>
                    </td>
                    <td>"#fff"</td>
                    <td>The color of the main text of the terminal</td>
                  </tr>
                  <tr>
                    <td>
                      <code>backgroundColor</code>
                    </td>
                    <td>"#000"</td>
                    <td>
                      The color and opacity of the window and main terminal
                      background
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>selectionColor</code>
                    </td>
                    <td>"rgba(248,28,229,0.3)"</td>
                    <td>
                      The background color/opacity of the text selection in
                      terminal
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>borderColor</code>
                    </td>
                    <td>"#333"</td>
                    <td>The color of the main window border and tab bar</td>
                  </tr>
                  <tr>
                    <td>
                      <code>css</code>
                    </td>
                    <td>""</td>
                    <td>Custom CSS to include in the main window</td>
                  </tr>
                  <tr>
                    <td>
                      <code>padding</code>
                    </td>
                    <td>"12px 14px"</td>
                    <td>CSS padding values for the space around each term</td>
                  </tr>
                  <tr>
                    <td>
                      <code>colors</code>
                    </td>
                    <td>
                      {'{'} black: "#000000", red: "#ff0000", ... {'}'}
                    </td>
                    <td>
                      A list of overrides for the color palette. The names of
                      the keys represent the "ANSI 16", which can all be seen{' '}
                      <a href="https://github.com/zeit/hyper/blob/master/app/utils/colors.js">
                        in the default config
                      </a>
                      .
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>shell</code>
                    </td>
                    <td>""</td>
                    <td>
                      A path to a custom shell to run when Hyper starts a new
                      session
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>shellArgs</code>
                    </td>
                    <td>"['--login']"</td>
                    <td>An array of shell arguments</td>
                  </tr>
                  <tr>
                    <td>
                      <code>env</code>
                    </td>
                    <td>
                      {'{'}
                      {'}'}
                    </td>
                    <td>
                      An object of environment variables to set before launching
                      shell
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>windowSize</code>
                    </td>
                    <td>[540, 380]</td>
                    <td>The default width/height in pixels of a new window</td>
                  </tr>
                  <tr>
                    <td>
                      <code>scrollback</code>
                    </td>
                    <td>1000</td>
                    <td>
                      The number of rows to be persisted in terminal buffer for
                      scrolling
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>copyOnSelect</code>
                    </td>
                    <td>false</td>
                    <td>
                      If true, selected text will automatically be copied to the
                      clipboard
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>quickEdit</code>
                    </td>
                    <td>false</td>
                    <td>
                      If true, on right click selected text will be copied or
                      pasted if no selection is present (true by default on
                      Windows)
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>defaultSSHApp</code>
                    </td>
                    <td>true</td>
                    <td>
                      If true, Hyper will be set as the default protocol client
                      for SSH
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>modifierKeys</code>
                    </td>
                    <td>
                      {'{'}
                      altIsMeta: false
                      {'}'}
                    </td>
                    <td>
                      Change the behaviour of modifier keys to act as meta key
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>showHamburgerMenu</code>
                    </td>
                    <td>true on Linux/Windows, false on macOS</td>
                    <td>
                      Change the visibility of the hamburger menu. Available
                      options are: true, false
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>showWindowControls</code>
                    </td>
                    <td>""</td>
                    <td>
                      Change the position/visibility of the window controls.
                      Available options are: true, false, "left"
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*
              Extensions API
            */}
            <h2 id="extensions-api">
              <a href="#extensions-api">Extensions API</a>
            </h2>
            <p>
              Extensions are universal Node.js modules loaded by both Electron
              and the renderer process.
            </p>
            <p>
              The extension system is designed around <b>composition</b> of the
              APIs we use to build the terminal: <code>React</code> components
              and <code>Redux</code> actions.
            </p>
            <p>
              Instead of exposing a custom API method or parameter for every
              possible customization point, we allow you to intercept and
              compose every bit of functionality!
            </p>
            <p>
              The only knowledge that is therefore required to successfully
              extend <code>Hyper</code> is that of its underlying open source
              libraries.
            </p>
            <p>
              You can find additional details about plugin development{' '}
              <a href="https://github.com/zeit/hyper/blob/master/PLUGINS.md">
                here
              </a>
            </p>
            <p>Your module has to expose at least one of these methods:</p>
            <div className="table large">
              <table className="api">
                <thead>
                  <tr>
                    <td>Method</td>
                    <td>Invoked from</td>
                    <td>Description</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>onApp</code>
                    </td>
                    <td>Electron</td>
                    <td>
                      <p>
                        Invoked when the app first loads. If a plugin reloads,
                        it's invoked again with the existing app.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>app</code>
                            </td>
                            <td>The electron app.</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>onWindow</code>
                    </td>
                    <td>Electron</td>
                    <td>
                      <p>
                        Invoked when each window is created. If a plugin
                        reloads, it's invoked again with the existing windows.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>window</code>
                            </td>
                            <td>
                              An electron <code>BrowserWindow</code>.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>onUnload</code>
                    </td>
                    <td>Electron</td>
                    <td>
                      <p>Invoked when a plugin is removed by the user.</p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>app</code>
                            </td>
                            <td>The electron app.</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>decorateConfig</code>
                    </td>
                    <td>Electron / Renderer</td>
                    <td>
                      <p>
                        <b>v0.5.0+</b>. Allows you to decorate the user's
                        configuration.
                        <br />
                        Useful for themeing or custom parameters for your
                        plugin.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>config</code>
                            </td>
                            <td>
                              The <code>config</code> object
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>decorateEnv</code>
                    </td>
                    <td>Electron</td>
                    <td>
                      <p>
                        <b>v0.7.0+</b>. Allows you to decorate the user's
                        environment by returning a modified environment object.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>environment</code>
                            </td>
                            <td>
                              The <code>environment</code> object
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>decorateMenu</code>
                    </td>
                    <td>Electron</td>
                    <td>
                      <p>
                        Invoked with the Electron's <code>Menu</code> template.
                        If a plugin reloads, it's called again and the menu is
                        refreshed.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>menu</code>
                            </td>
                            <td>The menu template object</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>decorateBrowserOptions</code>
                    </td>
                    <td>Electron</td>
                    <td>
                      <p>
                        Allows you to decorate Electron's{' '}
                        <code>BrowserWindow</code> options when a new window is
                        created.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>options</code>
                            </td>
                            <td>
                              The <code>BrowserWindow</code> options object.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>onRendererWindow</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        Invoked when a plugin is first loaded or subsequently
                        reloaded in each window.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>window</code>
                            </td>
                            <td>The window object</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>middleware</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        A custom Redux middleware that can intercept any action.
                        Subsequently we invoke the <code>thunk</code>
                        middleware, which means your middleware can
                        <code>next</code> thunks.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>reduceUI</code>
                      <br />
                      <code>reduceSessions</code>
                      <br />
                      <code>reduceTermGroups</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        A custom reducer for the <code>ui</code>,{' '}
                        <code>sessions</code> or <code>termgroups</code> state
                        shape.
                      </p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>state</code>
                            </td>
                            <td>The Redux state object</td>
                          </tr>
                          <tr>
                            <td>
                              <code>action</code>
                            </td>
                            <td>The action object</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>getTabsProps</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        Passes down props from <code>&lt;Tabs&gt;</code>
                        to the <code>&lt;Header&gt;</code> component. Must
                        return the composed props object.
                      </p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>parentProps</code>
                            </td>
                            <td>Props form the parent component.</td>
                          </tr>
                          <tr>
                            <td>
                              <code>props</code>
                            </td>
                            <td>
                              The existing properties that will be passed to the
                              component.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>getTabProps</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        Passes down props from <code>&lt;Tab&gt;</code>
                        to the <code>&lt;Tabs&gt;</code> component. Must return
                        the composed props object.
                      </p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>uid</code>
                            </td>
                            <td>Tab / Term uid</td>
                          </tr>
                          <tr>
                            <td>
                              <code>parentProps</code>
                            </td>
                            <td>Props form the parent component.</td>
                          </tr>
                          <tr>
                            <td>
                              <code>props</code>
                            </td>
                            <td>
                              The existing properties that will be passed to the
                              component.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>getTermGroupProps</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        Passes down props from <code>&lt;Terms&gt;</code>
                        to the <code>&lt;TermGroup&gt;</code> component. Must
                        return the composed props object.
                      </p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>uid</code>
                            </td>
                            <td>TermGroup uid</td>
                          </tr>
                          <tr>
                            <td>
                              <code>parentProps</code>
                            </td>
                            <td>Props form the parent component.</td>
                          </tr>
                          <tr>
                            <td>
                              <code>props</code>
                            </td>
                            <td>
                              The existing properties that will be passed to the
                              component.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>getTermProps</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        Passes down props from <code>&lt;TermGroup&gt;</code>
                        to the <code>&lt;Term&gt;</code> component. Must return
                        the composed props object.
                      </p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>uid</code>
                            </td>
                            <td>Term uid</td>
                          </tr>
                          <tr>
                            <td>
                              <code>parentProps</code>
                            </td>
                            <td>Props form the parent component.</td>
                          </tr>
                          <tr>
                            <td>
                              <code>props</code>
                            </td>
                            <td>
                              The existing properties that will be passed to the
                              component.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>mapHyperState</code>
                      <br />
                      <code>mapTermsState</code>
                      <br />
                      <code>mapHeaderState</code>
                      <br />
                      <code>mapNotificationsState</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        A custom mapper for the state properties that{' '}
                        <a
                          href="https://github.com/zeit/hyper/tree/master/lib/containers"
                          target="_blank"
                        >
                          container components
                        </a>{' '}
                        receive. Note that for children components to get these
                        properties, you have to pass them down using the
                        corresponding methods (like <code>getTermProps</code>).
                      </p>
                      <p>Must return an extended object of the map passed.</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>state</code>
                            </td>
                            <td>
                              The <code>Redux</code> global state
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <code>map</code>
                            </td>
                            <td>
                              The existing map of properties that will be passed
                              to the component.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>mapHyperDispatch</code>
                      <br />
                      <code>mapTermsDispatch</code>
                      <br />
                      <code>mapHeaderDispatch</code>
                      <br />
                      <code>mapNotificationsDispatch</code>
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        A custom mapper for the dispatch properties. Must return
                        an extended object of the map passed.
                      </p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>dispatch</code>
                            </td>
                            <td>The Redux dispatch function</td>
                          </tr>
                          <tr>
                            <td>
                              <code>map</code>
                            </td>
                            <td>
                              The existing map of properties that will be passed
                              to the component.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>decorateHyper</code>
                      <br />
                      <code>decorateNotifications</code>
                      <br />
                      <code>decorateNotification</code>
                      <code>decorateHeader</code>
                      <br />
                      <code>decorateTabs</code>
                      <br />
                      <code>decorateTab</code>
                      <code>decorateTerms</code>
                      <br />
                      <code>decorateTermGroup</code>
                      <br />
                      <code>decorateSplitPane</code>
                      <br />
                      <code>decorateTerm</code>
                      <br />
                    </td>
                    <td>Renderer</td>
                    <td>
                      <p>
                        Invoked with the <code>React</code>{' '}
                        <code>Component</code>
                        to decorate. Must return a Higher Order Component.
                      </p>
                      <p>Parameters:</p>
                      <table className="params">
                        <tbody>
                          <tr>
                            <td>
                              <code>Hyper</code>
                            </td>
                            <td>
                              The <code>React</code> <code>Component</code>
                              constructor.
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <code>env</code>
                            </td>
                            <td>
                              A collection of useful module references for
                              building components.{' '}
                              <a href="#decorating-components">See below</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="extensions-module-loading">
              <a href="#extensions-module-loading">Module loading</a>
            </h3>
            <p>
              The user can hot-load and hot-reload plugins by pressing Command +
              R (refresh). Please strive to make plugins that don't require a
              complete restart of the application to work.
            </p>
            <h4>Notice</h4>
            <p>
              Plugins affecting the `BrowserWindow` will the effect on new
              windows after hot-reload.
            </p>
            <p>In the future we might do this automatically.</p>
            <p>
              When developing, you can add your plugin to{' '}
              <PathLink
                os={this.props.OS}
                path=".hyper_plugins/local"
                type="plugins"
              />{' '}
              and then specify it under the <code>localPlugins</code> array in{' '}
              <PathLink path=".hyper.js" type="config" />. We load new plugins:
            </p>
            <ul>
              <li>Periodically (every few hours)</li>
              <li>
                When changes are made to the configuration file (
                <code>plugins</code> or <code>localPlugins</code>)
              </li>
              <li>When the user clicks Plugins &gt; Update all now</li>
            </ul>
            <p>The process of reloading involves</p>
            <ul>
              <li>
                Running <code>npm prune</code> and <code>npm install</code> in{' '}
                <PathLink path=".hyper_plugins" type="plugins" />.
              </li>
              <li>
                Pruning the <code>require.cache</code> in both electron and the
                renderer process
              </li>
              <li>
                Invoking <code>on*</code> methods on the existing instances and
                re-rendering components with the fresh decorations in place.
              </li>
            </ul>
            <h4 id="plugins-location">
              <a href="#plugins-location">Plugins location</a>
            </h4>
            <div className="table">
              <table id="plugins-paths-table" className="offset-header">
                <tr>
                  <td>
                    <strong>macOS</strong>
                  </td>
                  <td>
                    <Path os="mac" path=".hyper_plugins" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Windows</strong>
                  </td>
                  <td>
                    <Path os="windows" path=".hyper_plugins" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Linux</strong>
                  </td>
                  <td>
                    <Path os="linux" path=".hyper_plugins" />
                  </td>
                </tr>
              </table>
            </div>
            <p>
              Note: plugins at <code>~/.hyper_plugins</code> still supported,
              but will be ignored, if plugins in application directory present.
              Otherwise they will be moved to the application directory at first
              run.
            </p>
            <p>
              Note: on the main process, plugins are registered as soon as
              possible (we fire <code>onLoad</code>). On the browser, it's up to
              the user to trigger their load by pressing command+R. We put the
              user in control of the loading in this way to prevent them from
              losing critical work by extensions that reset state or don't
              preserve it correctly.
            </p>
            <h3 id="decorating-components">
              <a href="#decorating-components">Decorating components</a>
            </h3>
            <p>
              We give you the ability to provide a higher order component for
              every piece of the <code>Hyper</code> UI.
              <br /> Its structure is as follows:
            </p>
            <pre>
              <code>
                &lt;Hyper&gt;{'\n'}
                {'  '}&lt;Header&gt;{'\n'}
                {'    '}&lt;Tabs&gt;{'\n'}
                {'      '}&lt;Tab /&gt; ...{'\n'}
                {'    '}&lt;/Tabs&gt;{'\n'}
                {'  '}&lt;/Header&gt;{'\n'}
                {'  '}&lt;Terms&gt;{'\n'}
                {'    '}&lt;TermGroup&gt;{'\n'}
                {'      '}&lt;SplitPane&gt;{'\n'}
                {'        '}&lt;TermGroup&gt;{'\n'}
                {'          '}&lt;Term /&gt; ...{'\n'}
                {'        '}&lt;/TermGroup&gt;{'\n'}
                {'        '}&lt;TermGroup&gt;{'\n'}
                {'          '}&lt;Term /&gt; ...{'\n'}
                {'        '}&lt;/TermGroup&gt;{'\n'}
                {'      '}&lt;/SplitPane&gt;{'\n'}
                {'    '}&lt;/TermGroup&gt;{'\n'}
                {'  '}&lt;/Terms&gt;{'\n'}
                {'  '}&lt;Notifications&gt;{'\n'}
                {'    '}&lt;Notification /&gt; ...{'\n'}
                {'  '}&lt;/Notifications&gt;{'\n'}&lt;/Hyper&gt;
              </code>
            </pre>
            <p>
              All the <code>decorate*</code> methods receive the following
              references in an object passed as the second parameter:
            </p>
            <div className="table large">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <code>React</code>
                    </td>
                    <td>The entire React namespace.</td>
                  </tr>
                  <tr>
                    <td>
                      <code>notify</code>
                    </td>
                    <td>
                      <p>
                        A helper function that shows a desktop notification. The
                        first parameter is the title, the second is the optional
                        body of the notification, and the third is another
                        optional parameter which can be used to log details to
                        the development console.
                      </p>
                      <p>
                        To pass these details, simply provide and object with an{' '}
                        <code>error</code> property containing the information
                        to log.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>Notification</code>
                    </td>
                    <td>
                      The <code>Notification</code> component in case you want
                      to re-use it.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              All the components accept the following two properties to extend
              their markup:
            </p>
            <div className="table large">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <code>customChildren</code>
                    </td>
                    <td>
                      An array of <code>Element</code> or a single
                      <code>Element</code> to insert at the bottom of the
                      component.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>customChildrenBefore</code>
                    </td>
                    <td>
                      The same as the above property, but inserted as the first
                      child element(s) of the component.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Your higher order component can supply a <code>onDecorated</code>
              property to the decorated component to get a reference to its
              instance.
            </p>
            <p>
              Your Term higher order component can supply an{' '}
              <code>onCursorMove</code>
              handler property that be called when cursor has moved with an
              object parameter representing its relative position to Term
              origin:
            </p>
            <div className="table large">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <code>x</code>
                    </td>
                    <td>Horizontal position in pixels</td>
                  </tr>
                  <tr>
                    <td>
                      <code>y</code>
                    </td>
                    <td>Vertical position in pixels</td>
                  </tr>
                  <tr>
                    <td>
                      <code>width</code>
                    </td>
                    <td>Cursor width in pixels</td>
                  </tr>
                  <tr>
                    <td>
                      <code>height</code>
                    </td>
                    <td>Cursor height in pixels</td>
                  </tr>
                  <tr>
                    <td>
                      <code>col</code>
                    </td>
                    <td>Horizontal position in columns</td>
                  </tr>
                  <tr>
                    <td>
                      <code>row</code>
                    </td>
                    <td>Vertical position in rows</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              We encourage you to maintain compatibility with other decorators.
              Since many can be set, don't assume that yours is the only one.
            </p>
            <p>
              For example, if you're passing children, compose potential
              existing values:
            </p>
            <pre>
              <code>
                render () {'{'}
                {'\n'}
                {'  '}const customChildren =
                Array.from(this.props.customChildren){'\n'}
                {'    '}.concat(&lt;p&gt;My new child&lt;/p&gt;);{'\n'}
                {'  '}return &lt;Tab {'{'}...this.props{'}'} customChildren=
                {'{'}customChildren{'}'} /&gt;{'\n'}
                {'}'}
              </code>
            </pre>
            <p>
              Or if you use <code>onDecorated</code> property
            </p>
            <pre>
              <code>
                onDecorated (term) {'{'}
                {'\n'}
                {'  '}this.term = term;{'\n'}
                {'  '}if (this.props.onDecorated) {'{'}
                {'\n'}
                {'    '}this.props.onDecorated(term);{'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'}'}
              </code>
            </pre>
            <h3 id="actions-and-effects">
              <a href="#actions-and-effects">Actions and Effects</a>
            </h3>
            <p>
              All the{' '}
              <a
                href="https://github.com/zeit/hyper/tree/master/lib/actions"
                target="_blank"
              >
                Redux actions
              </a>{' '}
              are available for you to handle through your middleware and
              reducers. For an example, refer to the{' '}
              <a href="#hyperpower">Hyperpower</a> reference plugin.
            </p>
            <p>Side effects occur in two fundamental forms:</p>
            <ul>
              <li>Some actions dispatch other actions based on state.</li>
              <li>
                Some actions do async work by communicating over the RPC channel
                to the main process
              </li>
            </ul>
            <p>
              In all cases, the side effect is passed as the <code>effect</code>{' '}
              key in the action and later handled by our middleware.
            </p>
            <p>
              This means that you can override, compose or completely eliminate
              effects! In other words, this is how you can change the default
              functionality or behavior of the app.
            </p>
            <p>
              As an example, consider the action we use to increase the font
              size when you press <code>Command+=</code>:
            </p>
            <pre>
              <code>
                export function increaseFontSize () {'{'}
                {'\n'}
                {'  '}return (dispatch, getState) =&gt; {'{'}
                {'\n'}
                {'    '}dispatch({'{'}
                {'\n'}
                {'      '}type: UI_FONT_SIZE_INCR,{'\n'}
                {'      '}effect () {'{'}
                {'\n'}
                {'        '}const state = getState();{'\n'}
                {'        '}const old = state.ui.fontSizeOverride ||
                state.ui.fontSize;{'\n'}
                {'        '}const value = old + 1;{'\n'}
                {'        '}dispatch({'{'}
                {'\n'}
                {'          '}type: UI_FONT_SIZE_SET,{'\n'}
                {'          '}value{'\n'}
                {'        '}
                {'}'});{'\n'}
                {'      '}
                {'}'}
                {'\n'}
                {'    '}
                {'}'});{'\n'}
                {'  '}
                {'}'};{'\n'}
                {'}'}
              </code>
            </pre>
            <h3 id="xtermjs">
              <a href="#xtermjs">The underlying terminal</a>
            </h3>
            <p>
              <code>Hyper</code> achieves a lot of its speed and functionality
              thanks to the power of{' '}
              <a target="_blank" href="https://github.com/xtermjs/xterm.js/">
                xterm.js
              </a>
            </p>
            <h3 id="additional-apis">
              <a href="#additional-apis">Additional APIs</a>
            </h3>
            <p>
              The Electron <code>app</code> objects are extended with the
              following properties:
            </p>
            <div className="table large">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <code>config</code>
                    </td>
                    <td>
                      An <code>Object</code> with the <code>config</code> block
                      from <PathLink path=".hyper.js" type="config" />.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>plugins</code>
                    </td>
                    <td>
                      An <code>Object</code> with helpers for plugins.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>getWindows</code>
                    </td>
                    <td>
                      A <code>Function</code> that returns an <code>Set</code>{' '}
                      of all the open windows.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>createWindow</code>
                    </td>
                    <td>
                      A <code>Function</code> that will create a new window.
                      Accepts an optional <code>callback</code> that will be
                      passed as the new window's <code>init</code> callback.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Electron <code>BrowserWindow</code> objects are extended with the
              following parameters:
            </p>
            <div className="table large">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <code>rpc</code>
                    </td>
                    <td>
                      An <code>EventEmitter</code> that allows for communication
                      with the window process.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>sessions</code>
                    </td>
                    <td>
                      A <code>Map</code> of <code>Session</code>
                      objects which hold the communication with each term's
                      pty..
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>Renderer windows are similarly extended with:</p>
            <div className="table large">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <code>rpc</code>
                    </td>
                    <td>
                      An <code>EventEmitter</code> that allows for communication
                      with the window process.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>store</code>
                    </td>
                    <td>
                      The Redux <code>Store</code> object. This allows access to{' '}
                      <code>dispatch</code> actions or read the global state
                      with <code>getState</code>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The <code>rpc</code> object is symmetrical between browser and
              renderer process. The API is the same as Node.js, with the
              exception that it only admits a single object as its parameters
              only:
            </p>
            <pre>
              <code>
                window.rpc.emit('hi there', {'{'}
                {'\n'}
                {'  '}some: 'payload',{'\n'}
                {'  '}any: [{'\n'}
                {'    '}'object',{'\n'}
                {'    '}'here'{'\n'}
                {'  '}]{'\n'}
                {'}'});
              </code>
            </pre>
            <h3 id="hyperyellow">
              <a href="#hyperyellow">Example theme: Hyperyellow</a>
            </h3>
            <p>
              The following extension simply alters the config to add CSS and
              yellow colors! Here's the{' '}
              <a
                target="_blank"
                href="https://github.com/zeit/hyperyellow/blob/29c4ac9748be74d7ad587b7077758ef26f6ce5c2/index.js#L1"
              >
                code
              </a>
              .
            </p>
            <p style={{ textAlign: 'center' }}>
              <img src="static/hyperyellow.gif" width={446} height={333} />
            </p>
            <p>
              Themes are simply plugins! Only one hook,{' '}
              <code>decorateConfig</code>
              is needed:
            </p>
            <pre>
              <code>
                exports.decorateConfig = (config) =&gt; {'{'}
                {'\n'}
                {'  '}return Object.assign({'{'}
                {'}'}, config, {'{'}
                {'\n'}
                {'    '}borderColor: 'yellow',{'\n'}
                {'    '}cursorColor: 'yellow',{'\n'}
                {'    '}css: `{'\n'}
                {'      '}${'{'}config.css || ''{'}'}
                {'\n'}
                {'      '}.tabs_nav .tabs_list .tab_text {'{'}
                {'\n'}
                {'        '}color: yellow;{'\n'}
                {'      '}
                {'}'}
                {'\n'}
                {'      '}.tabs_nav .tabs_title {'{'}
                {'\n'}
                {'        '}color: yellow;{'\n'}
                {'      '}
                {'}'}
                {'\n'}
                {'    '}`{'\n'}
                {'  '}
                {'}'});{'\n'}
                {'}'}
              </code>
            </pre>
            <p>
              I grabbed the class names by inspecting the term with Devtools,
              which you can trigger from{' '}
              <code>View -&gt; Toggle Developer Tools</code>. When you do so,
              notice that some classes are automatically generated and followed
              by a random nonce (e.g.: <code>term_13hv8io</code>). Ignore those:
              they change with every new window!
            </p>
            <p>
              Notice the emphasis on playing nice with other extensions.
              Specifically, we create a new object, extend only the keys we are
              interested in, and we <b>compose</b> the CSS to preserve the
              user's setting and that of other authors':
            </p>
            <pre>
              <code>
                return Object.assign({'{'}
                {'}'}, config, {'{'}
                {'\n'}
                {'  '}css: `{'\n'}
                {'    '}${'{'}config.css || ''{'}'}
                {'\n'}
                {'    '}/* your css here */{'\n'}
                {'  '}`{'\n'}
                {'}'});
              </code>
            </pre>
            <h3 id="hyperpower">
              <a href="#hyperpower">Example extension: Hyperpower</a>
            </h3>
            <p>The following extension renders particles as the caret moves:</p>
            <p style={{ textAlign: 'center' }}>
              <img
                src="https://cloud.githubusercontent.com/assets/13041/16820268/13c9bfe6-4905-11e6-8fe4-baf8fc8d9293.gif"
                width={457}
                height={340}
              />
            </p>
            <p>
              Let's walk through{' '}
              <a
                target="_blank"
                href="https://github.com/zeit/hyperpower/blob/master/index.js"
              >
                its code
              </a>
              .
              <br />
              First, we intercept the Redux action <code>SESSION_ADD_DATA</code>
              . See the whole list of them{' '}
              <a
                target="_blank"
                href="https://github.com/zeit/hyper/tree/master/lib/actions"
              >
                here
              </a>
              .
            </p>
            <pre>
              <code>
                exports.middleware = (store) =&gt; (next) =&gt; (action) =&gt;{' '}
                {'{'}
                {'\n'}
                {'  '}if ('SESSION_ADD_DATA' === action.type) {'{'}
                {'\n'}
                {'    '}const {'{'} data {'}'} = action;{'\n'}
                {'    '}if (/bash: wow: command not found/.test(data)) {'{'}
                {'\n'}
                {'      '}store.dispatch({'{'}
                {'\n'}
                {'        '}type: 'WOW_MODE_TOGGLE'{'\n'}
                {'      '}
                {'}'});{'\n'}
                {'    '}
                {'}'} else {'{'}
                {'\n'}
                {'      '}next(action);{'\n'}
                {'    '}
                {'}'}
                {'\n'}
                {'  '}
                {'}'} else {'{'}
                {'\n'}
                {'    '}next(action);{'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'}'};
              </code>
            </pre>
            <p>
              Notice that we don't re-dispatch the action, which means we never
              render the output of the command to the terminal. Instead, we
              dispatch an action of our own, which we grab in the{' '}
              <code>uiReducer</code>and later map:
            </p>
            <pre>
              <code>
                exports.reduceUI = (state, action) =&gt; {'{'}
                {'\n'}
                {'  '}switch (action.type) {'{'}
                {'\n'}
                {'    '}case 'WOW_MODE_TOGGLE':{'\n'}
                {'      '}return state.set('wowMode', !state.wowMode);{'\n'}
                {'  '}
                {'}'}
                {'\n'}
                {'  '}return state;{'\n'}
                {'}'};{'\n'}
                {'\n'}exports.mapTermsState = (state, map) =&gt; {'{'}
                {'\n'}
                {'  '}return Object.assign(map, {'{'}
                {'\n'}
                {'    '}wowMode: state.ui.wowMode{'\n'}
                {'  '}
                {'}'});{'\n'}
                {'}'};
              </code>
            </pre>
            <p>
              We then want to decorate the <code>&lt;Term&gt;</code> component
              so that we can access the underlying caret.
            </p>
            <p>
              However, <code>&lt;Term&gt;</code> is not a container that we can
              map props to. So we use <code>getTermProps</code> to pass the
              property further down:
            </p>
            <pre>
              <code>
                exports.getTermProps = (uid, parentProps, props) =&gt; {'{'}
                {'\n'}
                {'  '}return Object.assign(props, {'{'}
                {'\n'}
                {'    '}wowMode: parentProps.wowMode{'\n'}
                {'  '}
                {'}'});{'\n'}
                {'}'}
              </code>
            </pre>
            <p>
              The extension then{' '}
              <a
                href="https://github.com/zeit/hyperpower/blob/master/index.js#L51"
                target="_blank"
              >
                returns
              </a>{' '}
              a higher order component to wrap <code>&lt;Term&gt;</code>. Notice
              we pass the <code>onDecorated</code>
              property to access the base Term component and its DOM ref, and
              the <code>onCursorMove</code> property to use Hyper cursor API:
            </p>
            <pre>
              <code>
                render () {'{'}
                {'\n'}
                {'  '}return React.createElement(Term, Object.assign({'{'}
                {'}'}, this.props, {'{'}
                {'\n'}
                {'    '}onDecorated: this._onDecorated{'\n'},{'    '}
                onCursorMove: this._onCursorMove{'\n'}
                {'  '}
                {'}'}));{'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>

        <Footer />

        <style jsx>{`
          :global(body) {
            color: #ccc;
          }

          .table {
            overflow-x: auto;
          }

          .table:not(:last-child) > table {
            margin: 48px 0;
          }

          .table > table {
            min-width: 500px;
          }

          .table.large {
            width: 900px;
            max-width: 100vw;
            margin-left: -100px;
          }

          .table.large > table {
            width: 900px;
            max-width: 100%;
          }

          #logo {
            margin-top: 48px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            padding: 0 40px;
            text-align: center;
            z-index: 1000;
          }

          #logo img {
            display: block;
            margin: 0 auto 10px;
          }

          #logo .title,
          #logo .subtitle {
            padding: 3px 0;
          }

          #logo .title {
            font-size: 16px;
          }

          #logo .title b {
            font-weight: 500;
          }

          #logo .subtitle {
            color: #9b9b9b;
          }

          #top {
            height: calc(100vh - 72px);
            width: 100vw;
            position: relative;
            text-align: center;
            max-width: 100%;
          }

          #top .top-content {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            opacity: 1;
          }

          .top-download {
            position: relative;
            bottom: 75px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
          }

          #arrow {
            position: absolute;
            left: 50%;
            margin-left: -9px;
            bottom: 20px;
          }

          #video {
            height: 50vh;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            position: absolute;
          }

          #video video {
            height: 100%;
            width: 100%;
          }

          #loading:before {
            content: 'Loading...';
            position: absolute;
            display: block;
            left: 0;
            top: 50%;
            right: 0;
            color: #666;
            opacity: 0;
            animation-name: appear;
            animation-delay: 2s;
            animation-duration: 500ms;
            animation-timing-function: ease;
            animation-fill-mode: forwards;
          }

          @keyframes appear {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          #content {
            max-width: 700px;
            margin: auto;
          }

          #content a,
          .other-downloads a {
            color: #fff;
            text-decoration: none;
            transition: 0.2s ease all;
            border-bottom: 1px solid transparent;
          }

          #content a:hover,
          .other-downloads a:hover {
            border-bottom: 1px solid #fff;
          }

          #content h2 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            font-size: 36px;
            color: #fff;
            margin: 100px 0 30px 0;
            padding-top: 30px;
          }

          #content h3 {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            font-size: 26px;
            color: #fff;
            margin: 48px 0 20px 0;
            padding-top: 20px;
          }

          #content h2 a,
          #content h3 a {
            color: #fff;
            border-bottom-width: 0;
          }

          #content p {
            font-size: 14px;
            line-height: 24px;
            margin: 0 0 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
          }

          #content p code,
          #content li code,
          #content td code {
            color: #fff;
          }

          #content p code:before,
          #content p code:after,
          #content td code:before,
          #content td code:after,
          #content li code:before,
          #content li code:after {
            content: '\\0060';
          }

          #content pre {
            margin: 30px;
            color: #50e3c2;
            line-height: 18px;
          }

          #content table thead td {
            color: #999;
            font-size: 12px;
            text-transform: uppercase;
          }

          #content table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            table-layout: fixed;
          }

          #content table p {
            margin-bottom: 0;
          }

          #content table p:not(:last-child) {
            margin-bottom: 16px;
          }

          #content table table.params {
            display: flex;
          }

          #content table table.params tr {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          #content table table.params tr:not(:last-child) {
            margin-bottom: 16px;
          }

          #content table table.params tbody td {
            width: 100%;
            border-color: transparent;
            padding: 0;
            color: #999;
          }

          #content table td > * + table.params {
            margin-top: 24px;
          }

          #content td > table {
            margin: 0;
          }

          #content table td {
            vertical-align: top;
            border: 1px solid #444;
            position: relative;
            word-break: break-word;
          }

          #content table td.highlighted:after {
            position: absolute;
            content: '';
            border: 1px solid #50e3c2;
            width: calc(100% + 2px);
            height: calc(100% + 2px);
            top: -1px;
            left: -1px;
            pointer-events: none;
          }

          #content table td.invisible-top-left {
            border-top: 0;
            border-left: 0;
          }

          #content #installation .latest-version-small {
            font-size: 14px;
          }

          #content #installation-table a {
            border-bottom: none;
            display: block;
            padding: 10px;
            transition: color 0.3s ease;
          }

          #content #installation-table a:hover {
            background: none;
            color: #50e3c2;
          }

          #content #installation-table .latest-version {
            padding-left: 5px;
          }

          #content #installation-table td {
            padding: 10px;
          }

          #content #installation-table td:not(:first-child) {
            text-align: center;
          }

          #content #installation-table td:not(.highlighted) img {
            opacity: 0.5;
            transition: opacity 0.3s ease;
            -webkit-backface-visibility: hidden;
          }

          #content #installation-table td a:hover img {
            opacity: 1;
          }

          #content #installation-table td.highlighted a {
            color: #50e3c2;
          }

          #content #installation-table {
            color: #fff;
            margin-top: 0;
          }

          #content #installation-table td[id^='td'] {
            padding: 0;
          }

          #content #installation-table img {
            width: 17px;
            height: 13px;
          }

          #content #config-paths-table td {
            padding: 10px;
          }

          #content #config-paths-table td:not(:first-child) {
            text-align: center;
            width: 66.67%;
          }

          #content #config-paths-table {
            color: #fff;
            margin-top: 0;
          }

          #content #plugins-paths-table td {
            padding: 10px;
          }

          #content #plugins-paths-table td:not(:first-child) {
            text-align: center;
            width: 66.67%;
          }

          #content #plugins-paths-table {
            color: #fff;
            margin-top: 0;
          }

          #content td.soon {
            color: #555;
          }

          #content thead td {
            padding: 10px 24px;
          }

          #content tbody td {
            padding: 24px;
          }

          #content table.config td:nth-child(1),
          #content table.api td:nth-child(1) {
            width: 30%;
            color: #999;
          }

          #content table.config td:nth-child(2),
          #content table.api td:nth-child(2) {
            width: 23%;
            color: #999;
          }

          #content table.config tbody td:first-child {
            color: #fff;
          }

          #content table.api tbody td:first-child {
            color: #fff;
          }

          #content table.api > tbody > tr > td:nth-child(2) {
            width: 13%;
          }

          #content td > p:first-child {
            margin-top: 0;
          }

          #content ul {
            margin: 20px 10px;
          }

          #content ul li {
            list-style-type: none;
            line-height: 18px;
            margin: 5px 0;
            padding-left: 20px;
          }

          #content ul li:before {
            content: '-';
            color: #999;
            position: absolute;
            margin-left: -20px;
          }

          #content p b {
            color: #fff;
          }

          @media screen and (max-height: 500px) {
            .title {
              display: none;
            }
          }

          @media screen and (max-height: 550px) {
            .title span {
              display: none !important;
            }

            #logo {
              display: none;
            }

            #video {
              top: 0 !important;
            }
          }

          @media screen and (max-height: 650px) {
            #logo img {
              height: 50px;
              width: auto;
              padding: 0;
              margin-top: 0;
            }

            #video {
              top: 48px;
              transform: translateY(0);
            }

            #logo {
              margin-top: 0;
            }
          }

          @media screen and (max-width: 900px) {
            .table.large {
              width: 100%;
              max-width: 100%;
              margin-left: 0;
            }
          }

          @media screen and (max-width: 800px) {
            #content table {
              margin-left: 0;
              margin-right: 0;
            }
            #download-for {
              display: none !important;
            }
            #header {
              width: 300px;
              margin: 0 auto;
            }
          }

          @media screen and (max-width: 700px) {
            #header {
              text-align: center;
              padding: 20px 0;
              position: static;
            }

            #content {
              padding: 20px;
            }

            #content h2 {
              margin-top: 0;
            }

            #content h2:first-child {
              padding-top: 0;
            }

            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: auto;
            }

            #content table {
              margin-left: 0;
              margin-right: 0;
              margin-bottom: 20px;
            }

            #content .table-note:after {
              margin: 15px 0;
              content: 'Please note: the complete table information is available in bigger resolutions!';
              display: block;
              color: #999;
            }

            #content img {
              max-width: 100%;
              height: auto;
            }

            #arrow {
              display: none;
            }
          }

          .is-hidden {
            display: none;
          }
        `}</style>
      </Layout>
    )
  }
}
