/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // All requests to /api/* ...
        destination: "http://127.0.0.1:8000/api/:path*", // ...are proxied to your backend
      },
    ];
  },
};

module.exports = nextConfig;
