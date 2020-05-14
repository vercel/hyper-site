const escape = require('shell-quote').quote

module.exports = {
  '**/*.js': (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${escape([filename])}"`)
      .join(' ')

    return [
      `eslint --max-warnings 0 ${filenames.join(' ')}`,
      `prettier --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ]
  },
}
