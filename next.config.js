/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fitbyfede-db.s3.amazonaws.com",
        port: "",
        pathname: "/1080/**",
      },
    ],
  },
};

module.exports = nextConfig;
