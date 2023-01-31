const NPM_API_URL = 'https://registry.npmjs.org'
const NPM_DOWNLOADS_URL = 'https://api.npmjs.org/downloads/point/last-month'

export default async function handler(req, res) {
  const { name } = req.query

  const packument = await (await fetch(`${NPM_API_URL}/${name}`)).json()
  const { downloads } = await (
    await fetch(`${NPM_DOWNLOADS_URL}/${name}`)
  ).json()
  const version = packument['dist-tags'].latest
  const npmUser = packument.versions[version]['_npmUser']

  // const npmMetadata = {
  //   name: packument.name,
  //   publisher: {
  //     email: npmUser.email,
  //     username: npmUser.name,
  //   },
  //   downloads,
  //   links: {
  //     homepage: packument?.homepage ?? `https://npmjs.com/package/${name}`,
  //     repository:
  //       packument?.repository?.url ?? `https://npmjs.com/package/${name}`,
  //   },
  //   version,
  // }
  const npmMetadata = {
    name: 'dummy',
    publisher: {
      email: 'dummy',
      username: 'dummy',
    },
    downloads: 1,
    links: {
      homepage: `https://npmjs.com/package/dummy`,
      repository: `https://npmjs.com/package/dummy`,
    },
    version: '1.0.0',
  }

  res.status(200).json(npmMetadata)
}
