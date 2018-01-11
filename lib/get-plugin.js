import fetch from 'isomorphic-unfetch'

export default async name => {
  const plugin = await fetch(`https://npmjs.now.sh/${name}/latest`)
  return await plugin.json()
}
