import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/protocol',
        destination: 'https://github.com/edp-protocol/entity-discovery-protocol',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
