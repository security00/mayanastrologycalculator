import { rewriteTodayHtml, secondsUntilUtcMidnight } from '../shared/today-signature.js';

const ASSET_PATHS = ['/today.html', '/today/index.html', '/today', '/today/'];

async function fetchTodayHtml(context) {
  const origin = new URL(context.request.url).origin;
  if (context.env?.ASSETS?.fetch) {
    for (const pathname of ASSET_PATHS) {
      const assetResponse = await context.env.ASSETS.fetch(new Request(`${origin}${pathname}`, {
        headers: context.request.headers,
      }));
      const type = assetResponse.headers.get('content-type') || '';
      if (assetResponse.ok && type.includes('text/html')) return assetResponse;
    }
  }
  return context.next();
}

export async function onRequest(context) {
  const response = await fetchTodayHtml(context);
  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const fallback = response.clone();
  try {
    const html = await response.text();
    const now = new Date();
    const headers = new Headers(fallback.headers);
    headers.delete('content-length');
    headers.set('cache-control', `public, max-age=${Math.min(secondsUntilUtcMidnight(now), 600)}`);
    return new Response(rewriteTodayHtml(html, now), {
      status: fallback.status,
      statusText: fallback.statusText,
      headers,
    });
  } catch {
    return fallback;
  }
}
