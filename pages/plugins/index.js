import PluginThemeShowcase from '../../components/plugin-theme-showcase'
import allPlugins from '../../plugins'

export default ({ plugins }) => (
  <PluginThemeShowcase plugins={plugins} variant="plugin" />
)

export const getStaticProps = () => ({
  props: {
    plugins: allPlugins.filter(
      (p) => p.type === 'plugin' && p.featured === true
    ),
  },
})
