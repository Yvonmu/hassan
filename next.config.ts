import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Workaround for Node.js 22 + Next.js 15.5.2 compatibility issue
  generateBuildId: async () => {
    // Use a simple timestamp-based ID
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
