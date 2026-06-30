import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Prevent canvas (node-gyp native module) from being bundled server-side
  serverExternalPackages: ['canvas'],

  // Exclude heavy folders from build trace to avoid Vercel trace timeout/errors
  outputFileTracingExcludes: {
    '*': [
      './node_modules/@swc/core-linux-x64-gnu',
      './node_modules/@swc/core-linux-x64-musl',
      './node_modules/canvas',
      './public/flowers',
      './public/leaves',
      './public/wraps',
      './public/ribbons',
    ],
  },

  webpack: (config) => {
    // Tell webpack to skip the native canvas module entirely
    config.externals = [
      ...(Array.isArray(config.externals) ? config.externals : [config.externals ?? {}]),
      { canvas: 'commonjs canvas' },
    ];
    return config;
  },
};

export default nextConfig;

