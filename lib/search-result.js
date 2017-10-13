import fetch from 'isomorphic-fetch'

// The data that will be displayed depends
// on what the user has written in the search
// box :)

export default async (search = null) => {
  const url = `https://api.npms.io/v2/search?q=keywords:hyper+theme,${search}`
  const response = await fetch(url)
  return await response.json()
}
