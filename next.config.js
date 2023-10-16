/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
    domains: ["fitbyfede-db.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
