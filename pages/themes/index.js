import PluginThemeShowcase from '../../components/plugin-theme-showcase'
import allPlugins from '../../plugins'

export default ({ plugins }) => (
  <PluginThemeShowcase plugins={plugins} variant="theme" />
)

export const getStaticProps = () => ({
  props: {
    plugins: allPlugins.filter(
      (p) => p.type === 'theme' && p.featured === true
    ),
  },
})
