import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const withNextIntl = createNextIntlPlugin();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "warlockja.com",
        pathname: "/cdn-cgi/image/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
