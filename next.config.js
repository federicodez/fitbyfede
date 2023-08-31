/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
