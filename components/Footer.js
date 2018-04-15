import { withRouter } from 'next/router'
import Link from 'next/link'
import AppleLogo from '../static/apple-logo.svg'
import LinuxLogo from '../static/linux-logo.svg'
import WindowsLogo from '../static/windows-logo.svg'

const Footer = ({}) => (
  <div className="info-bar">
    <div className="info-bar__contents container">
      <nav>
        <a target="_blank" href="https://github.com/zeit/hyper/releases">
          Changelog
        </a>
        <a target="_blank" href="https://github.com/zeit/hyper">
          GitHub
        </a>
        <span>
          License:&nbsp;<b>MIT</b>
        </span>
        <span>
          <span id="download-for">Download for:</span>
          <a href="/#installation" className="download-link">
            <AppleLogo />
          </a>
          <a href="/#installation" className="download-link">
            <WindowsLogo />
          </a>
          <a href="/#installation" className="download-link">
            <LinuxLogo />
          </a>
        </span>
      </nav>
      <a className="zeit-logo" target="_blank" href="https://zeit.co">
        <b>△</b>
      </a>
    </div>

    <style jsx>{`
      .info-bar {
        height: 100px;
        width: 100%;
        position: relative;
        z-index: 10000;
        display: flex;
        align-items: center;
        font-size: 12px;
      }

      .info-bar__contents {
        display: flex;
      }

      .info-bar a {
        color: #999;
      }

      .info-bar a:hover {
        color: #fff;
      }

      .info-bar__contents nav {
        margin-right: auto;
        display: flex;
      }

      .info-bar nav a {
        text-decoration: none;
        height: 16px;
        margin-left: 6px;
        margin-right: 4px;
      }

      .info-bar nav a:first-child {
        margin-left: 0;
      }

      .info-bar__contents nav > * {
        margin-left: 12px;
      }

      .info-bar span {
        color: #999;
        display: flex;
        align-items: center;
      }

      .info-bar :global(svg) {
        fill: currentColor;
        height: 16px;
      }

      .zeit-logo {
        font-size: 16px;
      }
    `}</style>
  </div>
)

export default withRouter(Footer)
