/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['common'],
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
