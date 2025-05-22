import plugins from 'plugins'
import PluginList from 'components/plugin-list'

export const metadata = {
  title: 'Latest Plugins',
  description: 'Latest Hyper plugins',
}

export default function NewestPluginsPage() {
  const sortedPlugins = [...plugins]
    .filter((plugin) => !plugin.type)
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))

  return <PluginList plugins={sortedPlugins} />
}
