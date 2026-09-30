import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating "N" dev badge (dev-only; it covered the sidebar contact links).
  devIndicators: false,
};

export default nextConfig;
