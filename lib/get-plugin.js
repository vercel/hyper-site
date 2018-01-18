import cachedFetch from './cached-json-fetch'

export default async name => {
  return await cachedFetch(
    `https://cors.now.sh/https://registry.npmjs.org/${name}/latest`
  )
}
