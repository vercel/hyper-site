import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

export const useFilter = defaultFilter => {
  const router = useRouter()

  const getFilter = useCallback(() => {
    const path = router.asPath.split('?')[1] || defaultFilter
    return path && path.replace('=', '')
  }, [router.asPath, defaultFilter])

  const [filter, setFilter] = useState(getFilter())

  const updateFilter = newFilter => {
    router.push(`${router.pathname}?${newFilter}`)
  }

  useEffect(() => {
    setFilter(getFilter())
  }, [getFilter])

  return [filter, updateFilter]
}
