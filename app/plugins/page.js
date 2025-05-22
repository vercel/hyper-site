import plugins from 'plugins'
import PluginList from 'components/plugin-list'

export const metadata = {
  title: 'Plugins',
  description: 'Hyper plugins directory',
}

export default function PluginsPage() {
  return <PluginList plugins={plugins.filter((plugin) => !plugin.type)} />
}
