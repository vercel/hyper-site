const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'mdx'],
  experimental: {
    plugins: true,
  },
})
