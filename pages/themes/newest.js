import PluginThemeShowcase from '../../components/plugin-theme-showcase'
import allPlugins from '../../plugins'

export default ({ plugins }) => (
  <PluginThemeShowcase plugins={plugins} variant="theme" filter="newest" />
)

export const getStaticProps = () => ({
  props: {
    plugins: allPlugins
      .filter((p) => p.type === 'theme')
      .sort((a, b) =>
        a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : 0
      ),
  },
})
