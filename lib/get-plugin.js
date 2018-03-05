import cachedFetch from './cached-json-fetch'

export default async name => {
  return await cachedFetch(`https://npmjs.now.sh/${name}/latest`)
}
