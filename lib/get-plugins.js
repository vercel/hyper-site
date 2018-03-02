import cachedFetch from './cached-json-fetch'

export default async ({ type, query }) => {
  let url

  if (type === 'plugins') {
    url = query
      ? `https://api.npms.io/v2/search?q=${query}+keywords:hyper-plugin`
      : `https://api.npms.io/v2/search?q=keywords:hyper-plugin`
  } else if (type === 'themes') {
    url = query
      ? `https://api.npms.io/v2/search?q=${query}+keywords:hyper-theme`
      : `https://api.npms.io/v2/search?q=keywords:hyper-theme`
  } else if (!type && query) {
    url = `https://api.npms.io/v2/search?q=hyper%2D${query}+keywords:hyper-plugin,hyper-theme`
  }

  return await cachedFetch(url)
}
