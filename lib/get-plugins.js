import fetch from 'isomorphic-fetch'

export default async (type = 'plugins') => {
  let url;

  if (type === 'plugins') {
    url = 'https://api.npms.io/v2/search?q=keywords:hyper+plugin,hyper-plugin'
  } else if (type === 'themes') {
    url = 'https://api.npms.io/v2/search?q=keywords:hyper+theme,hyper-theme'
  }

  const response = await fetch(url)
  return await response.json()
}
