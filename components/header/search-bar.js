import { useRef } from 'react'
import { Search } from '../icons'
import styles from './search-bar.module.css'

export default ({ onSearch }) => {
  const inputEl = useRef(null)

  const handleChange = e => onSearch(e.target.value)

  const handleFocus = () => inputEl.current.focus()

  return (
    <div className={styles.root}>
      <input
        ref={inputEl}
        onChange={handleChange}
        placeholder="Search store..."
        className={styles.input}
        aria-label="Search input"
      />
      <Search size={14} className={styles.icon} onClick={handleFocus} />
    </div>
  )
}
