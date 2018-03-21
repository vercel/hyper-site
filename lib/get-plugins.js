import cachedFetch from './cached-json-fetch'
import plugins from '../plugins.json'

export default async ({ type, query }) => {
  let url

  if (type && !query) {
    return plugins.filter(plugin => plugin.type === type)
  } else if (type && query) {
    return plugins.filter(
      plugin => plugin.type === type && plugin.name.includes(query)
    )
  } else if (!type && query) {
    return plugins.filter(plugin => plugin.name.includes(query))
  }

  return plugins
}
