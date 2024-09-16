/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ]
  },
};
module.exports = nextConfig

// domains: ['i.postimg.cc'],
// {
//   protocol: 'https',
//   hostname: 'example.com',
//   port: '',
//   pathname: '',
// },