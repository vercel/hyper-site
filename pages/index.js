import Page from 'components/page'
import Footer from 'components/footer'
import DownloadButton from 'components/download-button'
import { Download, LogoBig } from 'components/icons'
import heroStyles from 'styles/pages/home/hero.module.css'
import contentStyles from 'styles/pages/home/content.module.css'
import installationStyles from 'styles/pages/home/installation.module.css'
import useOs from 'lib/use-os'
import Terminal from 'components/terminal'

const Path = ({ os, path }) => (
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

const PathLink = ({ os, path, type }) => (
  <a href={`#${type}-location`}>
    <Path os={os} path={path} />
  </a>
)

const installationTableData = [
  {
    os: 'mac',
    renderText: () => (
      <>
        <b>macOS</b> (.app)
      </>
    ),
    path: 'mac',
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
  },
  {
    os: 'fedora',
    renderText: () => (
      <>
        <b>Fedora</b> (.rpm)
      </>
    ),
    path: 'rpm',
  },
  {
    os: 'linux',
    renderText: () => (
      <>
        <b>Other Linux distros</b> (.AppImage)
      </>
    ),
    path: 'AppImage',
  },
]

export const getStaticProps = async () => {
  const res = await fetch(
    'https://api.github.com/repos/zeit/hyper/releases/latest'
  )
  const latestRelease = await res.json()

  return {
    props: {
      latestRelease,
    },
    unstable_revalidate: 60 * 60 * 24,
  }
}

export default ({ latestRelease }) => {
  const os = useOs()

  return (
    <Page>
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
                <td>64-bit</td>
              </tr>
              {installationTableData.map(({ os: _os, renderText, path }) => (
                <tr key={_os}>
                  <td>{renderText()}</td>
                  <td
                    className={os === _os ? installationStyles.highlighted : ''}
                  >
                    <a href={`https://releases.hyper.is/download/${path}`}>
                      <Download
                        height={12}
                        width={16}
                        className={installationStyles.icon}
                      />
                      {latestRelease.tag_name}
                    </a>
                  </td>
                </tr>
              ))}
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
         * Extensions API
         */}
        <h2 id="extensions-api">
          <a href="#extensions-api">Extensions API</a>
        </h2>
        <p>
          Extensions are universal Node.js modules loaded by both Electron and
          the renderer process.
        </p>
        <p>
          The extension system is designed around <b>composition</b> of the APIs
          we use to build the terminal: <code>React</code> components and{' '}
          <code>Redux</code> actions.
        </p>
        <p>
          Instead of exposing a custom API method or parameter for every
          possible customization point, we allow you to intercept and compose
          every bit of functionality!
        </p>
        <p>
          The only knowledge that is therefore required to successfully extend{' '}
          <code>Hyper</code> is that of its underlying open source libraries.
        </p>
        <p>
          You can find additional details about plugin development{' '}
          <a href="https://github.com/zeit/hyper/blob/master/PLUGINS.md">
            in the Hyper repository
          </a>
          .
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
                    Invoked when the app first loads. If a plugin reloads, it's
                    invoked again with the existing app.
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
                    Invoked when each window is created. If a plugin reloads,
                    it's invoked again with the existing windows.
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
                    Useful for themeing or custom parameters for your plugin.
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
                    Invoked with the Electron's <code>Menu</code> template. If a
                    plugin reloads, it's called again and the menu is refreshed.
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
                    Allows you to decorate Electron's <code>BrowserWindow</code>{' '}
                    options when a new window is created.
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
                    to the <code>&lt;Header&gt;</code> component. Must return
                    the composed props object.
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
                    to the <code>&lt;Tabs&gt;</code> component. Must return the
                    composed props object.
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
                    to the <code>&lt;TermGroup&gt;</code> component. Must return
                    the composed props object.
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
                    to the <code>&lt;Term&gt;</code> component. Must return the
                    composed props object.
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
                      rel="noopener"
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
                          The existing map of properties that will be passed to
                          the component.
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
                    A custom mapper for the dispatch properties. Must return an
                    extended object of the map passed.
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
                          The existing map of properties that will be passed to
                          the component.
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
                    Invoked with the <code>React</code> <code>Component</code>
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
                          A collection of useful module references for building
                          components.{' '}
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
          The user can hot-load and hot-reload plugins by pressing Command + R
          (refresh). Please strive to make plugins that don't require a complete
          restart of the application to work.
        </p>
        <h4>Notice</h4>
        <p>
          Plugins affecting the `BrowserWindow` will the effect on new windows
          after hot-reload.
        </p>
        <p>In the future we might do this automatically.</p>
        <p>
          When developing, you can add your plugin to{' '}
          <PathLink os={os} path=".hyper_plugins/local" type="plugins" /> and
          then specify it under the <code>localPlugins</code> array in{' '}
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
          <table id="plugins-paths-table">
            <tbody>
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
            </tbody>
          </table>
        </div>
        <p>
          Note: plugins at <code>~/.hyper_plugins</code> still supported, but
          will be ignored, if plugins in application directory present.
          Otherwise they will be moved to the application directory at first
          run.
        </p>
        <p>
          Note: on the main process, plugins are registered as soon as possible
          (we fire <code>onLoad</code>). On the browser, it's up to the user to
          trigger their load by pressing command+R. We put the user in control
          of the loading in this way to prevent them from losing critical work
          by extensions that reset state or don't preserve it correctly.
        </p>
        <h3 id="decorating-components">
          <a href="#decorating-components">Decorating components</a>
        </h3>
        <p>
          We give you the ability to provide a higher order component for every
          piece of the <code>Hyper</code> UI.
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
                    body of the notification, and the third is another optional
                    parameter which can be used to log details to the
                    development console.
                  </p>
                  <p>
                    To pass these details, simply provide and object with an{' '}
                    <code>error</code> property containing the information to
                    log.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <code>Notification</code>
                </td>
                <td>
                  The <code>Notification</code> component in case you want to
                  re-use it.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          All the components accept the following two properties to extend their
          markup:
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
                  <code>Element</code> to insert at the bottom of the component.
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
          handler property that be called when cursor has moved with an object
          parameter representing its relative position to Term origin:
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
          For example, if you're passing children, compose potential existing
          values:
        </p>
        <pre>
          <code>
            render () {'{'}
            {'\n'}
            {'  '}const customChildren = Array.from(this.props.customChildren)
            {'\n'}
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
            rel="noopener"
          >
            Redux actions
          </a>{' '}
          are available for you to handle through your middleware and reducers.
          For an example, refer to the <a href="#hyperpower">Hyperpower</a>{' '}
          reference plugin.
        </p>
        <p>Side effects occur in two fundamental forms:</p>
        <ul>
          <li>Some actions dispatch other actions based on state.</li>
          <li>
            Some actions do async work by communicating over the RPC channel to
            the main process
          </li>
        </ul>
        <p>
          In all cases, the side effect is passed as the <code>effect</code> key
          in the action and later handled by our middleware.
        </p>
        <p>
          This means that you can override, compose or completely eliminate
          effects! In other words, this is how you can change the default
          functionality or behavior of the app.
        </p>
        <p>
          As an example, consider the action we use to increase the font size
          when you press <code>Command+=</code>:
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
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/xtermjs/xterm.js/"
          >
            xterm.js
          </a>
        </p>
        <h3 id="additional-apis">
          <a href="#additional-apis">Additional APIs</a>
        </h3>
        <p>
          The Electron <code>app</code> objects are extended with the following
          properties:
        </p>
        <div className="table large">
          <table>
            <tbody>
              <tr>
                <td>
                  <code>config</code>
                </td>
                <td>
                  An <code>Object</code> with the <code>config</code> block from{' '}
                  <PathLink path=".hyper.js" type="config" />.
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
                  A <code>Function</code> that returns an <code>Set</code> of
                  all the open windows.
                </td>
              </tr>
              <tr>
                <td>
                  <code>createWindow</code>
                </td>
                <td>
                  A <code>Function</code> that will create a new window. Accepts
                  an optional <code>callback</code> that will be passed as the
                  new window's <code>init</code> callback.
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
                  objects which hold the communication with each term's pty..
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
                  <code>dispatch</code> actions or read the global state with{' '}
                  <code>getState</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The <code>rpc</code> object is symmetrical between browser and
          renderer process. The API is the same as Node.js, with the exception
          that it only admits a single object as its parameters only:
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
          The following extension simply alters the config to add CSS and yellow
          colors! Here's the{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/zeit/hyperyellow/blob/29c4ac9748be74d7ad587b7077758ef26f6ce5c2/index.js#L1"
          >
            code
          </a>
          .
        </p>
        <p style={{ textAlign: 'center' }}>
          <video
            src="/hyperyellow.mp4"
            autoPlay
            muted
            playsInline
            loop
            width={446}
            height={332}
            alt="hyperyellow_example"
          />
        </p>
        <p>
          Themes are simply plugins! Only one hook, <code>decorateConfig</code>
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
          I grabbed the class names by inspecting the term with Devtools, which
          you can trigger from <code>View -&gt; Toggle Developer Tools</code>.
          When you do so, notice that some classes are automatically generated
          and followed by a random nonce (e.g.: <code>term_13hv8io</code>).
          Ignore those: they change with every new window!
        </p>
        <p>
          Notice the emphasis on playing nice with other extensions.
          Specifically, we create a new object, extend only the keys we are
          interested in, and we <b>compose</b> the CSS to preserve the user's
          setting and that of other authors':
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
          <video
            src="/hyperpower.mp4"
            autoPlay
            muted
            playsInline
            loop
            width={456}
            height={340}
            alt="hyperpower_example"
          />
        </p>
        <p>
          Let's walk through{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/zeit/hyperpower/blob/master/index.js"
          >
            its code
          </a>
          .
          <br />
          First, we intercept the Redux action <code>SESSION_ADD_DATA</code>.
          You can find the full list of actions{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/zeit/hyper/tree/master/lib/actions"
          >
            in the repository
          </a>
          .
        </p>
        <pre>
          <code>
            exports.middleware = (store) =&gt; (next) =&gt; (action) =&gt; {'{'}
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
          render the output of the command to the terminal. Instead, we dispatch
          an action of our own, which we grab in the <code>uiReducer</code>and
          later map:
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
          We then want to decorate the <code>&lt;Term&gt;</code> component so
          that we can access the underlying caret.
        </p>
        <p>
          However, <code>&lt;Term&gt;</code> is not a container that we can map
          props to. So we use <code>getTermProps</code> to pass the property
          further down:
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
            rel="noopener"
          >
            returns
          </a>{' '}
          a higher order component to wrap <code>&lt;Term&gt;</code>. Notice we
          pass the <code>onDecorated</code>
          property to access the base Term component and its DOM ref, and the{' '}
          <code>onCursorMove</code> property to use Hyper cursor API:
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
    </Page>
  )
}
