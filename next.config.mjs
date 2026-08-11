/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  pageExtensions: ["ts", "tsx"],
  experimental: {
    inlineCss: true
  },
  images: {
    // Required for output:"export" — there is no server at runtime to run the
    // optimizer, so /_next/image requests 404 in production without this.
    // Fixes both the dev-server 500s on next/image pages and the 7-page
    // broken-hero-background bug found in the audit (same root cause).
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
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      {
        // style-src allows 'unsafe-inline' because experimental.inlineCss (above)
        // inlines all page CSS into <style> tags — a deliberate tradeoff for a
        // static-export site with no user-generated-content injection vector,
        // not an oversight. Tighten with nonces if a server runtime is adopted later.
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self'",
          "connect-src 'self'",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "object-src 'none'"
        ].join("; ")
      }
    ];

    return [
      { source: "/:path*", headers: security },
      {
        // The entrance-intro gate (kill switch + first-frame timing logic)
        // must never be cached, otherwise "switch it off without a redeploy"
        // becomes "switch it off and wait for a TTL". Note: headers() is
        // inert under output:"export" — the host/CDN must be configured to
        // match this.
        source: "/intro-gate.js",
        headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }]
      },
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
