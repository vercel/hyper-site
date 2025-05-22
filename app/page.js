import HomePage, { getStaticProps } from '../pages/index'

export const revalidate = 60 * 60 * 24

export default async function Page() {
  const { props } = await getStaticProps()
  return <HomePage {...props} />
}
