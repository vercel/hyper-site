import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'

export default () => {
  const plugins = allPlugins
    .filter((p) => p.type === 'plugin')
    .sort((a, b) =>
      a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : 0
    )

  return (
    <PluginThemeShowcase plugins={plugins} variant="plugin" filter="newest" />
  )
}
