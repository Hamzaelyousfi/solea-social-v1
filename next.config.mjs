/** @type {import('next').NextConfig} */
// Force webpack build when hosts set TURBOPACK=1 (fixes font module resolution).
if (process.env.TURBOPACK) {
  delete process.env.TURBOPACK
}
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
