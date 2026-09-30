import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample catalog imagery is served from Unsplash until real assets exist
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
};

export default nextConfig;
