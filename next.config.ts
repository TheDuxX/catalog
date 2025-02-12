import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "trpxvxjnxygldjddxgpz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
