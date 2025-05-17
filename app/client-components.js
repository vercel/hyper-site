'use client'

import useOs from 'lib/use-os'
import { useState, useEffect } from 'react'
import DownloadButton from 'components/download-button'

export function ClientDownloadButton(props) {
  const os = useOs()
  return <DownloadButton {...props} os={os} />
}

export function ClientOsProvider({ children }) {
  const os = useOs()
  return children(os)
}
