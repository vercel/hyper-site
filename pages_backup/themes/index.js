import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import { getPluginPreviewImage } from 'lib/plugin'

export default function ThemeIndexPage({ themes }) {
  return <PluginThemeShowcase plugins={themes} variant="theme" />
}

export function getStaticProps() {
  const themes = allPlugins
    .filter((p) => p.type === 'theme' && p.featured === true)
    .map((p) => ({
      ...p,
      preview: getPluginPreviewImage(p.name),
    }))

  return {
    props: {
      themes,
    },
  }
}
