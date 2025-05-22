import Path from './path'

export default function PathLink({ os, path, type }) {
  return (
    <a href={`#${type}-location`}>
      <Path os={os} path={path} />
    </a>
  )
}
