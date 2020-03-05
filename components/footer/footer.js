import AppleLogo from '../../components/icons/apple-logo.svg'
import LinuxLogo from '../../components/icons/linux-logo.svg'
import WindowsLogo from '../../components/icons/windows-logo.svg'
import Link from '../link'
import styles from './footer.module.css'

export default () => (
  <footer className={styles.root}>
    <nav className={styles.content}>
      <div className={styles.left}>
        <Link href="https://github.com/zeit/hyper/releases">Changelog</Link>
        <Link href="https://github.com/zeit/hyper">GitHub</Link>
        <span>
          License:&nbsp;<b>MIT</b>
        </span>
        <span className={styles.download}>
          Download for:
          <Link href="/#installation">
            <AppleLogo />
          </Link>
          <Link href="/#installation">
            <WindowsLogo />
          </Link>
          <Link href="/#installation">
            <LinuxLogo />
          </Link>
        </span>
      </div>

      <Link className={styles.logo} href="https://zeit.co">
        △
      </Link>
    </nav>
  </footer>
)
