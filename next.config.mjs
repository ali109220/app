/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  pageExtensions: ["ts", "tsx"],
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "tayseerdemo.xyz" },
      { protocol: "https", hostname: "www.tayseerdemo.xyz" },
      { protocol: "https", hostname: "static.prod-images.emergentagent.com" }
    ]
  },
  async headers() {
    const immutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
    ];
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
    ];

    return [
      { source: "/:path*", headers: security },
      { source: "/fonts/:path*", headers: immutable },
      { source: "/logo-light.svg", headers: immutable },
      { source: "/tayseer-banking-hero.svg", headers: immutable },
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
