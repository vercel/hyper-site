import plugins from '../plugins.json'

export default ({ type, query }) => {
  let url

  if (type && !query) {
    return plugins.filter(plugin => plugin.type === type)
  } else if (type && query) {
    return plugins.filter(
      plugin =>
        plugin.type === type &&
        (plugin.name.includes(query) || plugin.description.includes(query))
    )
  } else if (!type && query) {
    return plugins.filter(
      plugin =>
        plugin.name.includes(query) || plugin.description.includes(query)
    )
  }

  return plugins
}
