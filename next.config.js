const withMDX = require('@zeit/next-mdx')()

module.exports = withMDX({
  target: 'serverless'
})
