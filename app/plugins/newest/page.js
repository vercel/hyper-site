import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'

async function getPlugins() {
  const plugins = allPlugins
    .filter((p) => p.type === 'plugin')
    .sort((a, b) =>
      a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : 0
    )

  return plugins
}

export default async function PluginNewestPage() {
  const plugins = await getPlugins()
  
  return (
    <PluginThemeShowcase plugins={plugins} variant="plugin" filter="newest" />
  )
}