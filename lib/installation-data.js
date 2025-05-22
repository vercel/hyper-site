export const installationTableData = [
  {
    os: 'mac',
    renderText: () => (
      <>
        <b>macOS</b> (.app)
      </>
    ),
    path: 'mac',
    arm64Path: 'mac_arm64',
  },
  {
    os: 'windows',
    renderText: () => (
      <>
        <b>Windows</b> (.exe)
      </>
    ),
    path: 'win',
  },
  {
    os: 'ubuntu',
    renderText: () => (
      <>
        <b>Debian</b> (.deb)
      </>
    ),
    path: 'deb',
    arm64Path: 'deb_arm64',
  },
  {
    os: 'fedora',
    renderText: () => (
      <>
        <b>Fedora</b> (.rpm)
      </>
    ),
    path: 'rpm',
    arm64Path: 'rpm_arm64',
  },
  {
    os: 'linux',
    renderText: () => (
      <>
        <b>More Linux distros</b> (.AppImage)
      </>
    ),
    path: 'AppImage',
    arm64Path: 'AppImage_arm64',
  },
]
