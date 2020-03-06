import AppleLogo from '../icons/apple-logo.svg'
import WindowsLogo from '../icons/windows-logo.svg'
import LinuxLogo from '../icons/linux-logo.svg'
import DownloadIcon from '../icons/download-icon.svg'
import Link from '../link'
import styles from './download-button.module.css'

export default ({ os }) => {
  if (os === 'mac') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/mac"
      >
        <AppleLogo />
        <strong>Download Hyper for macOS</strong>
      </Link>
    )
  } else if (os === 'windows') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/win"
      >
        <WindowsLogo />
        <strong>Download Hyper for Windows</strong>
      </Link>
    )
  } else if (os === 'fedora') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/rpm"
      >
        <LinuxLogo />
        <strong>Download Hyper for Fedora</strong>
      </Link>
    )
  } else if (os === 'ubuntu') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/deb"
      >
        <LinuxLogo />
        <strong>Download Hyper for Ubuntu</strong>
      </Link>
    )
  } else if (os === 'linux') {
    return (
      <Link
        className={styles.root}
        href="https://releases.hyper.is/download/AppImage"
      >
        <LinuxLogo />
        <strong>Download Hyper for Linux</strong>
      </Link>
    )
  } else {
    return (
      <Link href="/#installation" className={styles.root}>
        <DownloadIcon />
        <strong>Download Hyper</strong>
      </Link>
    )
  }
}
