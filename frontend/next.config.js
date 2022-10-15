/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'dimasmiftah.me',
      'user-images.githubusercontent.com',
      'upload.wikimedia.org',
    ],
  },
};

module.exports = nextConfig;
