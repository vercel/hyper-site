import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'

async function getThemes() {
  const themes = allPlugins
    .filter((p) => p.type === 'theme')
    .sort((a, b) =>
      a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : 0
    )

  return themes
}

export default async function ThemeNewestPage() {
  const themes = await getThemes()
  
  return (
    <PluginThemeShowcase plugins={themes} variant="theme" filter="newest" />
  )
}