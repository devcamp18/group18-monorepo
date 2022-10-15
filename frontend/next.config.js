/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['dimasmiftah.me', 'user-images.githubusercontent.com'],
  },
};

module.exports = nextConfig;
