import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

async function getThemes() {
  const themes = allPlugins
    .filter((p) => p.type === 'theme' && p.featured === true)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return themes
}

export default async function ThemeIndexPage() {
  const themes = await getThemes()
  
  return <PluginThemeShowcase plugins={themes} variant="theme" />
}