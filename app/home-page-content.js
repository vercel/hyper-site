'use client'

import Footer from 'components/footer'
import DownloadButton from 'components/download-button'
import { Download, LogoBig } from 'components/icons'
import heroStyles from 'styles/pages/home/hero.module.css'
import contentStyles from 'styles/pages/home/content.module.css'
import installationStyles from 'styles/pages/home/installation.module.css'
import useOs from 'lib/use-os'
import Terminal from 'components/terminal'

function Path({ os, path }) {
  return (
    <code>
      {`${
        os === 'mac'
          ? '~/Library/Application Support/Hyper/'
          : os === 'windows'
          ? '$Env:AppData/Hyper/'
          : os === 'linux'
          ? '~/.config/Hyper/'
          : ''
      }${path}`}
    </code>
  )
}

function PathLink({ os, path, type }) {
  return (
    <a href={`#${type}-location`}>
      <Path os={os} path={path} />
    </a>
  )
}

const installationTableData = [
  {
    os: 'mac',
    renderText: () => (
      <>
        <b>macOS</b> (.app)
      </>
    ),
    path: 'mac',
    arm64Path: 'mac_arm64',
  },
  {
    os: 'windows',
    renderText: () => (
      <>
        <b>Windows</b> (.exe)
      </>
    ),
    path: 'win',
  },
  {
    os: 'ubuntu',
    renderText: () => (
      <>
        <b>Debian</b> (.deb)
      </>
    ),
    path: 'deb',
    arm64Path: 'deb_arm64',
  },
  {
    os: 'fedora',
    renderText: () => (
      <>
        <b>Fedora</b> (.rpm)
      </>
    ),
    path: 'rpm',
    arm64Path: 'rpm_arm64',
  },
  {
    os: 'linux',
    renderText: () => (
      <>
        <b>More Linux distros</b> (.AppImage)
      </>
    ),
    path: 'AppImage',
    arm64Path: 'AppImage_arm64',
  },
]

export default function HomePageContent({ latestRelease }) {
  const os = useOs()

  return (
    <>
      {/**
       * Hero
       */}
      <div className={heroStyles.root}>
        <LogoBig className={heroStyles.logo} />
        <div className={heroStyles.terminal}>
          <Terminal />
        </div>
        <div className={heroStyles.download}>
          <DownloadButton fixedWidth os={os} />
          <a className={heroStyles.other} href="#installation">
            View other platforms
          </a>
        </div>
      </div>

      {/**
       * Content
       */}
      <div className={contentStyles.root} id="content">
        {/**
         * Installation
         */}
        <h2 className={installationStyles.title} id="installation">
          <a href="#installation">Installation</a>
        </h2>
        <span>latest version: {latestRelease.tag_name}</span>
        <div className="table">
          <table className={installationStyles.table}>
            <tbody>
              <tr>
                <td className={installationStyles.invisibleTopLeft} />
                <td className={installationStyles.withSpacing}>64-bit</td>
                <td className={installationStyles.withSpacing}>arm64</td>
              </tr>
              {installationTableData.map(
                ({ os: _os, renderText, path, arm64Path }) => (
                  <tr key={_os}>
                    <td className={installationStyles.withSpacing}>
                      {renderText()}
                    </td>
                    {[path, arm64Path].map((archPath) => (
                      <td
                        key={archPath}
                        className={
                          os === _os
                            ? installationStyles.highlighted
                            : archPath || installationStyles.withSpacing
                        }
                      >
                        {archPath ? (
                          <a
                            href={`https://releases.hyper.is/download/${archPath}`}
                          >
                            <Download
                              height={12}
                              width={16}
                              className={installationStyles.icon}
                            />
                            {latestRelease.tag_name}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/**
         * Project goals
         */}
        <h2 id="hashtag-goals">
          <a href="#hashtag-goals">Project Goals</a>
        </h2>
        <p>
          The goal of the project is to create a beautiful and extensible
          experience for command-line interface users, built on open web
          standards. In the beginning, our focus will be primarily around speed,
          stability and the development of the correct API for extension
          authors.
        </p>
        <p>
          In the future, we anticipate the community will come up with
          innovative additions to enhance what could be the simplest, most
          powerful and well-tested interface for productivity.
        </p>

        {/**
         * Extensions
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
          Then edit <PathLink os={os} path=".hyper.js" type="config" /> and add
          it to <code>plugins</code>
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
          installed to <PathLink os={os} path=".hyper_plugins" type="plugins" />
          .
        </p>

        {/**
         * Keymaps
         */}
        <h2 id="keymaps">
          <a href="#keymaps">Keymaps</a>
        </h2>
        <p>
          All command keys can be changed. In order to change them, edit{' '}
          <PathLink os={os} path=".hyper.js" type="config" /> and add your
          desired change to <code>keymaps</code>.
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
                  <a href="https://github.com/vercel/hyper/blob/master/app/keymaps/win32.json">
                    Windows
                  </a>
                </td>
                <td>
                  <a href="https://github.com/vercel/hyper/blob/master/app/keymaps/linux.json">
                    Linux
                  </a>
                </td>
                <td>
                  <a href="https://github.com/vercel/hyper/blob/master/app/keymaps/darwin.json">
                    macOS
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/**
         * Configuration
         */}
        <h2 id="cfg">
          <a href="#cfg">Configuration</a>
        </h2>
        <h3 id="config-location">
          <a href="#config-location">Config location</a>
        </h3>
        <div className="table">
          <table id="config-paths-table">
            <tbody>
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
            </tbody>
          </table>
        </div>
        <p>
          Note: config at <code>~/.hyper.js</code> still supported, but will be
          ignored, if config in application directory present. Otherwise it will
          be moved to the application directory at first run.
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
                <td>"Menlo, DejaVu Sans Mono, Lucida Console, monospace"</td>
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
                <td>The font weight for bold characters: "normal" or "bold"</td>
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
                  The shape of the caret in the terminal. Available options are:
                  'BEAM', 'UNDERLINE', 'BLOCK'
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
                  The background color/opacity of the text selection in terminal
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
                  A list of overrides for the color palette. The names of the
                  keys represent the "ANSI 16", which can all be seen{' '}
                  <a href="https://github.com/vercel/hyper/blob/master/app/utils/colors.js">
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
                  If true, on right click selected text will be copied or pasted
                  if no selection is present (true by default on Windows)
                </td>
              </tr>
              <tr>
                <td>
                  <code>defaultSSHApp</code>
                </td>
                <td>true</td>
                <td>
                  If true, Hyper will be set as the default protocol client for
                  SSH
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
                  Change the visibility of the hamburger menu. Available options
                  are: true, false
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

        {/**
         * Extensions API - truncated for brevity, would continue with the full content
         */}
      </div>

      <Footer />

      <style jsx>{`
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

        #content table thead td {
          color: var(--gray);
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
          margin-bottom: 1rem;
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
          margin-bottom: 1rem;
        }

        #content table table.params tbody td {
          width: 100%;
          border-color: transparent;
          padding: 0;
          color: var(--gray);
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
          color: var(--gray);
        }

        #content table.config td:nth-child(2),
        #content table.api td:nth-child(2) {
          width: 23%;
          color: var(--gray);
        }

        #content table.config tbody td:first-child {
          color: var(--fg);
        }

        #content table.api tbody td:first-child {
          color: var(--fg);
        }

        #content table.api > tbody > tr > td:nth-child(2) {
          width: 13%;
        }

        #content td > p:first-child {
          margin-top: 0;
        }

        @media screen and (max-width: 900px) {
          .table.large {
            width: 100%;
            max-width: 100%;
            margin-left: 0;
          }

          .table tr td:nth-child(2) {
            display: none;
          }
        }

        @media screen and (max-width: 800px) {
          #content table {
            margin-left: 0;
            margin-right: 0;
          }
        }

        @media screen and (max-width: 700px) {
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
            color: var(--gray);
          }
        }
      `}</style>
    </>
  )
}