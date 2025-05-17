import plugins from 'plugins'
import PluginList from 'components/plugin-list'

export const metadata = {
  title: 'Themes',
  description: 'Hyper themes directory',
}

export default function ThemesPage() {
  return <PluginList plugins={plugins.filter((plugin) => plugin.type === 'theme')} />
}
