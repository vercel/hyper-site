import styles from './inline-code.module.css'

export default ({ children, noWrap }, { disabled, darkBg } = {}) => (
  <code
    className={`${styles.root} ${noWrap ? styles.noWrap : ''} ${
      disabled ? styles.disabled : ''
    } ${darkBg ? styles.dark : ''}`}
  >
    {children}
  </code>
)
