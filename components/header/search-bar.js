import { useRef } from 'react'
import { Search } from '../icons'
import styles from './search-bar.module.css'
import { useSearch } from 'lib/search-context'

export default () => {
  const { search, setSearch } = useSearch()
  const inputEl = useRef(null)

  const handleChange = (e) => setSearch(e.target.value)
  const handleFocus = () => inputEl.current.focus()

  return (
    <div className={styles.root}>
      <input
        value={search}
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
