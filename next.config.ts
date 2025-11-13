import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "titusukpono.pythonanywhere.com",
      },
    ],
  },
};

export default nextConfig;
