import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'

export default () => {
  const plugins = allPlugins.filter(
    (p) => p.type === 'plugin' && p.featured === true
  )

  return <PluginThemeShowcase plugins={plugins} variant="plugin" />
}
