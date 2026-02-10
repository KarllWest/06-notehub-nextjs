/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*', 
        destination: 'https://notehub-api.onrender.com/:path*', 
      },
    ];
  },
};

export default nextConfig;