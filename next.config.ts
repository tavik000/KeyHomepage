import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Hero banners are smooth color gradients; the default q=75 optimization
    // pass visibly banded/blotched them, so raise the ceiling and use it below.
    qualities: [75, 90]
  }
};

export default withNextIntl(nextConfig);
