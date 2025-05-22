const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'mdx'],
  experimental: { appDir: true },
}

module.exports = withMDX(nextConfig)
