import plugins from 'plugins'
import PluginList from 'components/plugin-list'

export const metadata = {
  title: 'Latest Themes',
  description: 'Latest Hyper themes',
}

export default function NewestThemesPage() {
  const sortedPlugins = [...plugins]
    .filter((plugin) => plugin.type === 'theme')
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))

  return <PluginList plugins={sortedPlugins} />
}
