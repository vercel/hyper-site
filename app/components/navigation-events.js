'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { pageView as gTagPageView } from '../../lib/gtag' // Ensure path is correct

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const nprogressTimeoutRef = useRef(null)
  const previousPathRef = useRef(null) // Initialize with null or current path

  useEffect(() => {
    const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

    // Initialize previousPathRef with the first path encountered
    if (previousPathRef.current === null) {
      previousPathRef.current = currentUrl
      // Potentially call gTagPageView for the initial load if not handled elsewhere
      // gTagPageView(currentUrl); // Uncomment if initial page view isn't logged by GA script itself
      return
    }

    // Only proceed if the path has actually changed.
    if (currentUrl === previousPathRef.current) {
      return
    }
    previousPathRef.current = currentUrl

    // Clear existing timeout if any
    if (nprogressTimeoutRef.current) {
      clearTimeout(nprogressTimeoutRef.current)
    }

    // Ensure NProgress is reset/stopped before starting a new timeout
    NProgress.done()

    // Start NProgress after a delay
    nprogressTimeoutRef.current = setTimeout(() => {
      NProgress.start()
    }, 250) // Original was 500ms, using 250ms as a test

    // Log page view for the new URL
    gTagPageView(currentUrl)

    return () => {
      clearTimeout(nprogressTimeoutRef.current)
      NProgress.done()
    }
  }, [pathname, searchParams])

  return null
}
