/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep local production builds (.next-build) separate from the running dev server (.next)
  // so running `npm run build` while `npm run dev` is active never corrupts vendor-chunks or CSS.
  distDir:
    !process.env.VERCEL && process.env.NODE_ENV === 'production'
      ? '.next-build'
      : '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
