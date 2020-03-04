// Thanks Scale! https://scale.ai/blog/increasing-the-performance-of-dynamic-next-js-websites

// TODO remove isomorphic-unfetch if fetch is not used on server

import lscache from 'lscache'
import fetch from 'isomorphic-unfetch'

const TTL_MINUTES = 5

const responseType = (response, type) => {
  switch (type) {
    case 'text':
      return response.text()
      break
    case 'blob':
      return response.blob()
    default:
      return response.json()
  }
}

export default async (url, options, type) => {
  if (typeof window === 'undefined') {
    return fetch(url, options).then(response => {
      return responseType(response, type)
    })
  }

  let cachedResponse = lscache.get(url)

  if (cachedResponse === null) {
    cachedResponse = await fetch(url, options).then(response =>
      responseType(response, type)
    )
    lscache.set(url, cachedResponse, TTL_MINUTES)
  }

  return cachedResponse
}

export const overrideCache = (url, val) => {
  lscache.set(key, val, TTL_MINUTES)
}
