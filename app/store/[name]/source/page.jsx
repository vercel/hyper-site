import SourceClient from './client'
import plugins from 'plugins.json'
import { getPluginPreviewImage } from 'lib/plugin'
import { notFound } from 'next/navigation'

export const revalidate = 60 * 60 * 24

export async function generateStaticParams() {
  return []
}

export default async function Page({ params }) {
  const plugin = plugins.find((e) => e.name === params.name)
  if (!plugin) notFound()

  const npmData = await (
    await fetch(`https://api.npms.io/v2/package/${plugin.name}`)
  ).json()

  const pluginMeta = await (
    await fetch(`https://unpkg.com/${plugin.name}@latest/?meta`)
  ).json()

  const filePaths = []
  ;(function getFilePaths(root) {
    for (const file of root.files) {
      if (file.type === 'directory') {
        getFilePaths(file)
      }
      if (file.type === 'file') {
        filePaths.push(file.path)
      }
    }
  })(pluginMeta)

  const cache = {}
  for (const path of filePaths) {
    const res = await fetch(`https://unpkg.com/${plugin.name}@latest${path}`)
    cache[path] = await res.text()
  }

  return (
    <SourceClient
      plugin={{ ...plugin, preview: getPluginPreviewImage(plugin.name) }}
      npmData={npmData}
      pluginMeta={pluginMeta}
      cache={cache}
    />
  )
}
