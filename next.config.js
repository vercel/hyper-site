const withMDX = require('@next/mdx')()

module.exports = withMDX({
  target: 'serverless',
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx']
})
