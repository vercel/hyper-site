import HomePage from '../components/home-page'

export const revalidate = 60 * 60 * 24

export default async function Page() {
  const res = await fetch(
    'https://api.github.com/repos/vercel/hyper/releases/latest'
  )
  const latestRelease = await res.json()

  return <HomePage latestRelease={latestRelease} />
}
