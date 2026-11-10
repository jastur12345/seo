import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Ads final URL is /seo/ — serve it with the trailing slash (no redirect hop).
  trailingSlash: true,
  async redirects() {
    return [{ source: "/seo-services/", destination: "/seo/", permanent: true }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
