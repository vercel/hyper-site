import { Apple, Linux, Windows, Download } from '../icons'
import Link from '../link'
import styles from './download-button.module.css'

export default ({ os }) => {
  if (os === 'mac') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/mac"
      >
        <Apple size={16} />
        <strong>Download Hyper for macOS</strong>
      </Link>
    )
  } else if (os === 'windows') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/win"
      >
        <Windows size={16} />
        <strong>Download Hyper for Windows</strong>
      </Link>
    )
  } else if (os === 'fedora') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/rpm"
      >
        <Linux size={16} />
        <strong>Download Hyper for Fedora</strong>
      </Link>
    )
  } else if (os === 'ubuntu') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/deb"
      >
        <Linux />
        <strong>Download Hyper for Ubuntu</strong>
      </Link>
    )
  } else if (os === 'linux') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/AppImage"
      >
        <Linux />
        <strong>Download Hyper for Linux</strong>
      </Link>
    )
  } else {
    return (
      <Link href="/#installation" className={styles.root}>
        <Download height={12} width={16} />
        <strong>Download Hyper</strong>
      </Link>
    )
  }
}
