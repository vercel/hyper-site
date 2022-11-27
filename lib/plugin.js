import metadata from 'plugin-images-metadata.json'

export function getPluginPreviewImage(pluginName) {
const metadata = metadata.find((f) => f.includes(pluginName))

  if (!metadata) {
    return null
  }

  return metadata
}
