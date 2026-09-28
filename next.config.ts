import type { NextConfig } from "next";

/**
 * Security headers. Los de abajo son seguros y no afectan el render.
 * La CSP va COMENTADA como plantilla: actívala y probá `npm run build && npm start`
 * antes de publicar, porque una CSP mal calibrada rompe estilos/fuentes/imágenes.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },                 // anti-clickjacking
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // { key: "Content-Security-Policy", value: [
  //   "default-src 'self'",
  //   "img-src 'self' data: blob: https://*.cloudfront.net https://*.amazonaws.com https://*.higgsfield.ai",
  //   "connect-src 'self' https://api.higgsfield.ai",
  //   "font-src 'self'",
  //   "style-src 'self' 'unsafe-inline'",   // Next inyecta estilos inline; ajustar con nonce si se endurece
  //   "frame-ancestors 'none'",
  //   "base-uri 'self'", "form-action 'self'",
  // ].join("; ") },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
