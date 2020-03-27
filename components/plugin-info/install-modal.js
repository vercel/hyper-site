import { useEffect, useRef } from 'react'
import selectText from '../../lib/select-text'
import styles from './install-modal.module.css'

export default ({ pluginName, open, onClose }) => {
  const preEl = useRef(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      selectText(preEl.current)
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  if (!open) {
    return null
  }

  return (
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.content}>
        <h3>Install {pluginName}</h3>
        <p>
          Use the <code>hyper</code> command, bundled with your Hyper app, to
          install {pluginName} by entering the following into Hyper:
        </p>
        <pre ref={preEl}>hyper i {pluginName}</pre>
        <a
          href="https://github.com/zeit/hyper-plugins/wiki/Security-and-Hyper-plugins"
          className={styles.security}
          target="_blank"
          rel="noopener noreferrer"
        >
          Security Notice
        </a>
      </div>
    </div>
  )
}
