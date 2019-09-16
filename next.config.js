const withMDX = require('@next/mdx')()

module.exports = withMDX({
  target: 'serverless',
  pageExtensions: ['js', 'mdx']
})
