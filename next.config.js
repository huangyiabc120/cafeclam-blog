/** @type {import('next').NextConfig} */
const nextConfig = {
  siteUrl: 'https://hyi-cafeclam.top',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

module.exports = nextConfig
