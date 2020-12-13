import { useState, useEffect } from 'react'

const useOs = () => {
  const [os, setOs] = useState('')

  useEffect(() => {
    const { userAgent } = navigator
    if (
      /Mac/.test(userAgent) &&
      !/iPhone/.test(userAgent) &&
      !/iPad/.test(userAgent)
    ) {
      setOs('mac')
    } else if (/Windows/.test(userAgent)) {
      setOs('windows')
    } else if (/Fedora/.test(userAgent)) {
      setOs('fedora')
    } else if (/Ubuntu/.test(userAgent)) {
      setOs('ubuntu')
    } else if (/Linux/.test(userAgent)) {
      setOs('linux')
    }
  }, [])

  return os
}

export default useOs
