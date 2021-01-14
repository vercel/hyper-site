import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'

export default function ThemeNewestPage({ themes }) {
  return (
    <PluginThemeShowcase plugins={themes} variant="theme" filter="newest" />
  )
}

export function getStaticProps() {
  const themes = allPlugins
    .filter((p) => p.type === 'theme')
    .sort((a, b) =>
      a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : 0
    )

  return {
    props: {
      themes,
    },
  }
}
