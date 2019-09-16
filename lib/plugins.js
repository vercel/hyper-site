import React from 'react'
import { useRouter } from 'next/router'
import getPlugins from './get-plugins'

let isFirstRenderReady = false

export const useIsPageReady = () => {
  const [isPageReady, setIsPageReady] = React.useState(isFirstRenderReady)

  React.useEffect(() => {
    if (!isPageReady) {
      isFirstRenderReady = true
      setIsPageReady(true)
    }
  }, [isPageReady])

  return isPageReady
}

export const usePlugins = options => {
  const isPageReady = useIsPageReady()
  const [plugins, setPlugins] = React.useState(
    isPageReady ? getPlugins(options) : []
  )

  React.useEffect(() => {
    setPlugins(getPlugins(options))
  }, [])

  return plugins
}

export const useFilter = defaultFilter => {
  const router = useRouter()
  const isPageReady = useIsPageReady()

  const getFilter = React.useCallback(() => {
    const path = router.asPath.split('?')[1] || defaultFilter
    return path && path.replace('=', '')
  }, [router.asPath, defaultFilter])

  const [filter, setFilter] = React.useState(
    isPageReady ? getFilter() : undefined
  )

  const updateFilter = newFilter => {
    router.push(`${router.pathname}?${newFilter}`)
  }

  React.useEffect(() => {
    setFilter(getFilter())
  }, [getFilter])

  return [filter, updateFilter]
}
