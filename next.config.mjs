/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ["ts", "tsx"],
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "tayseer.me" },
      { protocol: "https", hostname: "www.tayseer.me" },
      { protocol: "https", hostname: "static.prod-images.emergentagent.com" }
    ]
  },
  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
    ];

    return [
      { source: "/fonts/:path*", headers: immutable },
      { source: "/logo-light.svg", headers: immutable },
      { source: "/opengraph-image.svg", headers: immutable },
      {
        source: "/opengraph-image",
        headers: [
          ...immutable,
          { key: "Content-Type", value: "image/svg+xml; charset=utf-8" }
        ]
      }
    ];
  }
};

export default nextConfig;