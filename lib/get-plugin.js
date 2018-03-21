import cachedFetch from './cached-json-fetch'
import plugins from '../plugins.json'

export default async name => {
  const result = await cachedFetch(`https://api.npms.io/v2/package/${name}`)
  const plugin = plugins.find(plugin => plugin.name === name)

  return {
    ...result,
    meta: plugin
  }
}
