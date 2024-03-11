/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image.msscdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn.trenbe.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
    ],
  },
};

module.exports = nextConfig;
