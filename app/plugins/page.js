import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

async function getPlugins() {
  const plugins = allPlugins
    .filter((p) => p.type === 'plugin' && p.featured === true)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return plugins
}

export default async function PluginIndexPage() {
  const plugins = await getPlugins()
  
  return <PluginThemeShowcase plugins={plugins} variant="plugin" />
}