import type { NextConfig } from "next";

const apiBase = process.env.INTERNAL_API_BASE ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        destination: `${apiBase}/api/:path*`,
        source: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
