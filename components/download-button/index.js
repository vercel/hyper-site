import { Apple, Linux, Windows, Download } from '../icons'
import styles from './download-button.module.css'

export default ({ os, fixedWidth }) => {
  const cn = `${styles.root} ${fixedWidth ? styles.fixedWidth : ''}`
  if (os === 'mac') {
    return (
      <>
        <a
          className={cn}
          href="https://releases.hyper.is/download/mac"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Apple size={16} />
          <strong>Download Hyper for macOS</strong>
        </a>
      </>
    )
  } else if (os === 'windows') {
    return (
      <a
        className={cn}
        href="https://releases.hyper.is/download/win"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Windows size={16} />
        <strong>Download Hyper for Windows</strong>
      </a>
    )
  } else if (os === 'fedora') {
    return (
      <a
        className={cn}
        href="https://releases.hyper.is/download/rpm"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linux size={16} />
        <strong>Download Hyper for Fedora</strong>
      </a>
    )
  } else if (os === 'ubuntu') {
    return (
      <a
        className={cn}
        href="https://releases.hyper.is/download/deb"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linux size={16} />
        <strong>Download Hyper for Ubuntu</strong>
      </a>
    )
  } else if (os === 'linux') {
    return (
      <a
        className={cn}
        href="https://releases.hyper.is/download/AppImage"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linux />
        <strong>Download Hyper for Linux</strong>
      </a>
    )
  } else {
    return (
      <a href="/#installation" className={cn}>
        <Download height={12} width={16} />
        <strong>Download Hyper</strong>
      </a>
    )
  }
}
