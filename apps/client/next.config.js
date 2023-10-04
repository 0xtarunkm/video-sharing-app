/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['common', 'ui'],
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;
