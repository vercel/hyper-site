import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

export default function Page() {
  const plugins = allPlugins
    .filter((p) => p.type === 'plugin' && p.featured === true)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return <PluginThemeShowcase plugins={plugins} variant="plugin" />
}
