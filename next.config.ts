import type { NextConfig } from "next";

const legacySignRedirects = [
  ['chicchan', 'chikchan'],
  ['cimi', 'kimi'],
  ['muluc', 'muluk'],
  ['oc', 'ok'],
  ['chuen', 'chuwen'],
  ['cib', 'kib'],
  ['caban', 'kaban'],
  ['cauac', 'kawak'],
  ['ahau', 'ajaw'],
  ['ahaw', 'ajaw'],
].map(([from, to]) => ({
  source: `/day-signs/${from}`,
  destination: `/day-signs/${to}`,
  permanent: true,
}));

const mistypedUtmRedirects = [
  ['/utm_source=dev.to', '/?utm_source=dev.to'],
  ['/utm_source=dev.to/', '/?utm_source=dev.to'],
  ['/utm_source=reddit.com', '/?utm_source=reddit.com'],
  ['/utm_source=reddit.com/', '/?utm_source=reddit.com'],
  ['/utm_source%3Ddev.to', '/?utm_source=dev.to'],
  ['/utm_source%3Ddev.to/', '/?utm_source=dev.to'],
  ['/utm_source%3Dreddit.com', '/?utm_source=reddit.com'],
  ['/utm_source%3Dreddit.com/', '/?utm_source=reddit.com'],
].map(([source, destination]) => ({
  source,
  destination,
  statusCode: 301,
}));

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/pricing', destination: '/reports', permanent: true },
      { source: '/nawal-calculator', destination: '/mayan-sign-calculator', statusCode: 301 },
      { source: '/tzolkin-calculator', destination: '/mayan-calendar-calculator', statusCode: 301 },
      { source: '/today/', destination: '/today', statusCode: 301 },
      ...legacySignRedirects,
      ...mistypedUtmRedirects,
    ];
  },
};

export default nextConfig;
