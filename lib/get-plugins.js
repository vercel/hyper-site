import cachedFetch from './cached-json-fetch'

export default async (type = 'plugins') => {
  let url

  if (type === 'plugins') {
    url = 'https://api.npms.io/v2/search?q=keywords:hyper-plugin'
  } else if (type === 'themes') {
    url = 'https://api.npms.io/v2/search?q=keywords:hyper-theme'
  }

  return await cachedFetch(url)
}
