/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@typing-platform/database']
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com']
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
}

module.exports = nextConfig
