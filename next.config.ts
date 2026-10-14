import type { NextConfig } from 'next'

/**
 * Static export: GitHub Pages serves plain files, so there is no Next server.
 * The site lives under https://<user>.github.io/Portfolio, hence basePath —
 * set BASE_PATH='' to build for a domain root instead.
 */
const basePath = process.env.BASE_PATH ?? '/Portfolio'

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  // trailing slashes keep deep links working when a static host maps
  // /section/ to /section/index.html
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
