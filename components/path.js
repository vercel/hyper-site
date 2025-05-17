export default function Path({ os, path }) {
  return (
    <code>
      {`${
        os === 'mac'
          ? '~/Library/Application Support/Hyper/'
          : os === 'windows'
          ? '$Env:AppData/Hyper/'
          : os === 'linux'
          ? '~/.config/Hyper/'
          : ''
      }${path}`}
    </code>
  )
}
