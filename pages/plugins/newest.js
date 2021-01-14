import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'

export default function PluginNewestPage({ plugins }) {
  return (
    <PluginThemeShowcase plugins={plugins} variant="plugin" filter="newest" />
  )
}

export function getStaticProps() {
  // get all featured plugins then get the preview image's relative src
  const plugins = allPlugins
    .filter((p) => p.type === 'plugin')
    .sort((a, b) =>
      a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : 0
    )

  return {
    props: {
      plugins,
    },
  }
}
