import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

  // Next.js 16 uses Turbopack by default.
  // Declare an empty turbopack config to silence the webpack-vs-turbopack warning.
  // canvas is handled via serverExternalPackages above; no webpack alias needed.
  turbopack: {},
};

export default nextConfig;
