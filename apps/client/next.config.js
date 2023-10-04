/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['common', 'ui'],
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'tarunkm-video-sharing-app-thumbnail.s3.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
