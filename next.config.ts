import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy.html",
        destination: "/privacidad",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
