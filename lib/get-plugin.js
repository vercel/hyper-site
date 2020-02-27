import cachedFetch from './cached-json-fetch'
import plugins from '../plugins.json'

export default async name => {
  const plugin = name && plugins.find(plugin => plugin.name === name)

  if (!plugin) return

  try {
    const result = await cachedFetch(`https://api.npms.io/v2/package/${name}`)
    return { ...result, meta: plugin }
  } catch (err) {
    console.error('Failed to recieve package information from npms.io', err)
    return { meta: plugin }
  }
}
