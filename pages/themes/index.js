import PluginThemeShowcase from 'components/plugin-theme-showcase'
import allPlugins from 'plugins'
import fs from 'fs'
import { join } from 'path'
import { CLOUDINARY_PREFIX } from 'lib/constants'

export default function ThemeIndexPage({ themes }) {
  return <PluginThemeShowcase plugins={themes} variant="theme" />
}

export function getStaticProps() {
  // get all featured themes then get the preview image's relative src
  const themes = allPlugins
    .filter((p) => p.type === 'theme' && p.featured === true)
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
      themes,
    },
  }
}
