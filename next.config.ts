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

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/pricing', destination: '/reports', permanent: true },
      ...legacySignRedirects,
    ];
  },
};

export default nextConfig;
