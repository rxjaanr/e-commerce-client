/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/main",
      },
    ];
  },
};

module.exports = nextConfig;
