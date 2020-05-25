import { useState, useEffect } from 'react'
import { toClipboard } from 'copee'
import styles from './install-modal.module.css'

export default ({ pluginName, open, onClose }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  if (!open) {
    return null
  }

  const handleClick = () => {
    const success = toClipboard(`hyper i ${pluginName}`)

    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.content}>
        <h2>Install {pluginName}</h2>
        <p>Run the following command in Hyper:</p>
        <pre>hyper i {pluginName}</pre>
        <span className={styles.buttons}>
          <a
            href="https://github.com/zeit/hyper-plugins/wiki/Security-and-Hyper-plugins"
            className={styles.security}
            target="_blank"
            rel="noopener noreferrer"
          >
            Security Notice
          </a>
          <button onClick={handleClick} disabled={copied}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </span>
      </div>
    </div>
  )
}
