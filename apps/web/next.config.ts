import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Load environment variables from root directory
  env: {
    WEB_PORT: process.env.WEB_PORT,
    API_PORT: process.env.API_PORT,
    API_URL: process.env.API_URL,
    WEB_URL: process.env.WEB_URL,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.API_URL || "http://localhost:3001"
        }/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
