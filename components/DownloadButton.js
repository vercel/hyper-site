import AppleLogo from './icons/apple-logo.svg'
import WindowsLogo from './icons/windows-logo.svg'
import LinuxLogo from './icons/linux-logo.svg'
import DownloadIcon from './icons/download-icon.svg'

export default ({ os }) => (
  <>
    {(() => {
      if (os === 'mac') {
        return (
          <a
            className="download-button"
            href="https://releases.hyper.is/download/mac"
            target="_blank"
          >
            <AppleLogo />
            <strong>Download Hyper for macOS</strong>
          </a>
        )
      } else if (os === 'windows') {
        return (
          <a
            className="download-button"
            href="https://releases.hyper.is/download/win"
            target="_blank"
          >
            <WindowsLogo />
            <strong>Download Hyper for Windows</strong>
          </a>
        )
      } else if (os === 'fedora') {
        return (
          <a
            className="download-button"
            href="https://releases.hyper.is/download/rpm"
            target="_blank"
          >
            <LinuxLogo />
            <strong>Download Hyper for Fedora</strong>
          </a>
        )
      } else if (os === 'ubuntu') {
        return (
          <a
            className="download-button"
            href="https://releases.hyper.is/download/deb"
            target="_blank"
          >
            <LinuxLogo />
            <strong>Download Hyper for Ubuntu</strong>
          </a>
        )
      } else if (os === 'linux') {
        return (
          <a
            className="download-button"
            href="https://releases.hyper.is/download/AppImage"
            target="_blank"
          >
            <LinuxLogo />
            <strong>Download Hyper for Linux</strong>
          </a>
        )
      } else {
        return (
          <a href="/#installation" className="download-button" target="_blank">
            <DownloadIcon />
            <strong>Download Hyper</strong>
          </a>
        )
      }
    })()}

    <style jsx>{`
      .download-button {
        background: #fff;
        border-radius: 5px;
        color: #000;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        margin-bottom: 16px;
        text-decoration: none;
        transition: background 0.12s ease-in-out;
      }

      .download-button:hover {
        background: #e5e5e5;
      }

      .download-button :global(svg) {
        fill: #000;
        margin-right: 12px;
        height: 16px;
      }

      .download-button strong {
        color: #000000;
        margin-bottom: 3px;
      }
    `}</style>
  </>
)
