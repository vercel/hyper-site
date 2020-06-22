import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import fs from 'fs'
import { join } from 'path'
import { CLOUDINARY_PREFIX } from 'lib/constants'

export default ({ plugins }) => (
  <PluginThemeShowcase plugins={plugins} variant="plugin" />
)

export const getStaticProps = () => {
  // get all featured plugins then get the preview image's relative src
  const plugins = allPlugins
    .filter((p) => p.type === 'plugin' && p.featured === true)
    .map((p) => {
      const previewImageSrc = fs
        .readdirSync(join(process.cwd(), 'public', 'store'))
        .find((f) => f.includes(p.name))

      const preview = `${CLOUDINARY_PREFIX}${previewImageSrc}`

      return {
        ...p,
        preview,
      }
    })

  return {
    props: {
      plugins,
    },
  }
}
