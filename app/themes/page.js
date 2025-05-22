import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

export default function Page() {
  const themes = allPlugins
    .filter((p) => p.type === 'theme' && p.featured === true)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return <PluginThemeShowcase plugins={themes} variant="theme" />
}
