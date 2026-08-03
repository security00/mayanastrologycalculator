import { authJson, clearSessionCookie, isSameOriginRequest, validateCsrf } from '../../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  if (!isSameOriginRequest(request, env) || !validateCsrf(request)) {
    return authJson({ error: 'Invalid sign-out request.' }, 403);
  }

  return authJson(
    { success: true },
    200,
    [clearSessionCookie(request)],
  );
}
