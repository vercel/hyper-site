import { Apple, Linux, Windows } from '../icons'
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
            <Apple size={16} />
          </Link>
          <Link href="/#installation">
            <Windows size={16} />
          </Link>
          <Link href="/#installation">
            <Linux size={16} />
          </Link>
        </span>
      </div>

      <Link className={styles.logo} href="https://zeit.co">
        ▲
      </Link>
    </nav>
  </footer>
)
