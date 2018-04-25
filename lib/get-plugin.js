import cachedFetch from './cached-json-fetch'
import plugins from '../plugins.json'

export default async (name, { meta = false } = { meta }) => {
  const plugin = plugins.find(plugin => plugin.name === name)
  let result = {}

  if (!meta) {
    try {
      result = await cachedFetch(`https://api.npms.io/v2/package/${name}`)
    } catch (err) {
      console.error('Failed to recieve package information from npms.io', err)
    }
  }

  return {
    ...result,
    meta: plugin
  }
}
