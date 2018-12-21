import cachedFetch from './cached-json-fetch'
import plugins from '../plugins.json'

export default async (name, { meta = false } = { meta }) => {
  const plugin = plugins.find(plugin => plugin.name === name)
  let result = {}

  if (!meta) {
    try {
      result = await cachedFetch(`https://registry.npmjs.com/${name}/latest`)
    } catch (err) {
      console.error('Failed to recieve package information from npmjs.com', err)
    }
  }

  return {
    ...result,
    meta: plugin
  }
}
