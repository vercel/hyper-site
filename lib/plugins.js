import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import getPlugins from './get-plugins'

let isFirstRenderReady = false

export const useIsPageReady = () => {
  const [isPageReady, setIsPageReady] = useState(isFirstRenderReady)

  useEffect(() => {
    if (!isPageReady) {
      isFirstRenderReady = true
      setIsPageReady(true)
    }
  }, [isPageReady])

  return isPageReady
}

export const usePlugins = options => {
  const isPageReady = useIsPageReady()
  const [plugins, setPlugins] = useState(isPageReady ? getPlugins(options) : [])

  useEffect(() => {
    setPlugins(getPlugins(options))
  }, [])

  return plugins
}

export const useFilter = defaultFilter => {
  const router = useRouter()
  const isPageReady = useIsPageReady()

  const getFilter = useCallback(() => {
    const path = router.asPath.split('?')[1] || defaultFilter
    return path && path.replace('=', '')
  }, [router.asPath, defaultFilter])

  const [filter, setFilter] = useState(isPageReady ? getFilter() : undefined)

  const updateFilter = newFilter => {
    router.push(`${router.pathname}?${newFilter}`)
  }

  useEffect(() => {
    setFilter(getFilter())
  }, [getFilter])

  return [filter, updateFilter]
}
