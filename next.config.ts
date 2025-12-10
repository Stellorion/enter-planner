import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = { ...(config.resolve.alias || {}), '@': path.join(__dirname, 'src') };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
