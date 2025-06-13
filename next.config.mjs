/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  basePath: "/moodmeal",
  output: 'export',
  basePath: '/moodmeal',        // <-- название репозитория
  assetPrefix: '/moodmeal'
};

export default nextConfig;
