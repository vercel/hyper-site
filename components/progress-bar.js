'use client'

import { useEffect } from 'react'
import NProgress from 'nprogress'
import { usePathname, useSearchParams } from 'next/navigation'

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    let timeout

    const start = () => {
      timeout = setTimeout(NProgress.start, 500)
    }

    const done = () => {
      clearTimeout(timeout)
      NProgress.done()
    }

    start()
    done()

    return () => {
      clearTimeout(timeout)
    }
  }, [pathname, searchParams])

  return null
}
