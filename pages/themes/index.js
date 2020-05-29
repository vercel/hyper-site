import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import fs from 'fs'
import { join } from 'path'

export default ({ plugins }) => (
  <PluginThemeShowcase plugins={plugins} variant="theme" />
)

export const getStaticProps = () => {
  // get all featured themes then get the preview image's relative src
  const plugins = allPlugins
    .filter((p) => p.type === 'theme' && p.featured === true)
    .map((p) => ({
      ...p,
      preview: `/store/${fs
        .readdirSync(join(process.cwd(), 'public', 'store'))
        .find((f) => f.includes(p.name))}`,
    }))

  return {
    props: {
      plugins,
    },
  }
}
