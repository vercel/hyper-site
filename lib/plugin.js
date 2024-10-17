import metadata from 'plugin-images-metadata.json'

export function getPluginPreviewImage(pluginName) {
const m = metadata.find((f) => f.src.includes(pluginName))

  if (!m) {
    return null
  }

  return m
}
