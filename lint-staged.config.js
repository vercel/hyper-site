const escape = require('shell-quote').quote

module.exports = {
  '**/*.js': (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${escape([filename])}"`)
      .join(' ')

    return [`prettier --write ${escapedFileNames}`]
  },
}
