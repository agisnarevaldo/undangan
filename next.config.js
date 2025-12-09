/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'ulems.my.id'],
    unoptimized: true,
  },
  // Output as static site
  output: 'export',
  // Disable trailing slashes
  trailingSlash: false,
  // Configure basePath if needed
  basePath: '',
}

module.exports = nextConfig
