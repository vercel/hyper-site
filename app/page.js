import Page from 'components/page'
import HomePageContent from './home-page-content'

async function getLatestRelease() {
  const res = await fetch(
    'https://api.github.com/repos/vercel/hyper/releases/latest'
  )
  const latestRelease = await res.json()
  return latestRelease
}

export default async function HomePage() {
  const latestRelease = await getLatestRelease()

  return (
    <Page>
      <HomePageContent latestRelease={latestRelease} />
    </Page>
  )
}