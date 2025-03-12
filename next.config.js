/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    unoptimized: true // This will help with image optimization errors during build
  },
  reactStrictMode: true,
  output: 'standalone' // This helps with deployment
}

module.exports = nextConfig 