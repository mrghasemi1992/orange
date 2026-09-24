import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["orange.localhost"],
  // Keep the dev badge off the sidebar's theme toggle (bottom left).
  devIndicators: { position: "bottom-right" },
};

export default nextConfig;
