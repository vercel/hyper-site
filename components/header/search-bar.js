import { useRef } from 'react'
import { useRouter } from 'next/router'
import SearchIcon from '../icons/search.svg'
import styles from './search-bar.module.css'

export default () => {
  const router = useRouter()
  const inputEl = useRef(null)

  const handleFocus = () => inputEl.current.focus()

  const handleSearch = e => {
    const newQuery = e.target.value
    const queryObj = { ...router.query }

    if (newQuery) {
      queryObj.q = newQuery
    } else {
      delete queryObj.q
    }

    router.replace({ pathname: router.pathname, query: queryObj })
  }

  return (
    <div className={styles.root}>
      <input
        ref={inputEl}
        onKeyUp={handleSearch}
        placeholder="Search store..."
        className={styles.input}
        aria-label="Search input"
      />
      <SearchIcon className={styles.icon} onClick={handleFocus} />
    </div>
  )
}
