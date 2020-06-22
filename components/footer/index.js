import { Apple, Linux, Windows } from '../icons'
import styles from './footer.module.css'

export default () => (
  <footer className={styles.root}>
    <nav className={styles.content}>
      <div className={styles.left}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/zeit/hyper/releases"
        >
          Changelog
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/zeit/hyper"
        >
          GitHub
        </a>
        <span>
          License:&nbsp;<b>MIT</b>
        </span>
        <span className={styles.download}>
          Download for:
          <a href="/#installation" aria-label="Apple">
            <Apple size={16} />
          </a>
          <a href="/#installation" aria-label="Windows">
            <Windows size={16} />
          </a>
          <a href="/#installation" aria-label="Linux">
            <Linux size={16} />
          </a>
        </span>
      </div>

      <a
        target="_blank"
        rel="noopener noreferrer"
        className={styles.logo}
        href="https://zeit.co"
      >
        ▲
      </a>
    </nav>
  </footer>
)
