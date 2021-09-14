import { Apple, Linux, Windows, Download } from '../icons'
import styles from './download-button.module.css'
import useOs from 'lib/use-os'

const DownloadButton = () => {
  const os = useOs()

  if (os === 'mac') {
    return (
      <div className={styles.doubleWrap}>
        <a
          className={styles.root}
          href="https://releases.hyper.is/download/mac"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Apple size={16} />
          <strong>Download for Intel Chip</strong>
        </a>
        <a
          className={styles.root}
          href="https://releases.hyper.is/download/mac_arm64"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Apple size={16} />
          <strong>Download for Apple Chip</strong>
        </a>
      </div>
    )
  } else if (os === 'windows') {
    return (
      <a
        className={styles.root}
        href="https://releases.hyper.is/download/win"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Windows size={16} />
        <strong>Download</strong>
      </a>
    )
  } else if (os === 'fedora') {
    return (
      <a
        className={styles.root}
        href="https://releases.hyper.is/download/rpm"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linux size={16} />
        <strong>Download</strong>
      </a>
    )
  } else if (os === 'ubuntu') {
    return (
      <a
        className={styles.root}
        href="https://releases.hyper.is/download/deb"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linux size={16} />
        <strong>Download</strong>
      </a>
    )
  } else if (os === 'linux') {
    return (
      <a
        className={styles.root}
        href="https://releases.hyper.is/download/AppImage"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linux />
        <strong>Download</strong>
      </a>
    )
  } else {
    return (
      <a href="/#installation" className={styles.root}>
        <Download height={12} width={16} />
        <strong>Download</strong>
      </a>
    )
  }
}

export default DownloadButton
