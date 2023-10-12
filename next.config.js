/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
    domains: ["v2.exercisedb.io"],
  },
};

module.exports = nextConfig;
