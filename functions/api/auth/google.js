import {
  authJson,
  createAuthSessionToken,
  createSessionCookie,
  isSameOriginRequest,
  validateCsrf,
  verifyGoogleCredential,
} from '../../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  if (!env.GOOGLE_CLIENT_ID || !env.AUTH_SESSION_SECRET) {
    return authJson({ error: 'Google sign-in is not configured.' }, 503);
  }

  if (!isSameOriginRequest(request, env) || !validateCsrf(request)) {
    return authJson({ error: 'Invalid sign-in request.' }, 403);
  }

  try {
    const payload = await request.json();
    if (typeof payload.credential !== 'string' || !payload.credential) {
      return authJson({ error: 'Missing Google credential.' }, 400);
    }

    const user = await verifyGoogleCredential(payload.credential, env);
    const sessionToken = await createAuthSessionToken(user, env);

    return authJson(
      { user: { email: user.email, name: user.name, picture: user.picture } },
      200,
      [createSessionCookie(request, sessionToken)],
    );
  } catch (error) {
    console.error('Google sign-in failed', error);
    return authJson({ error: 'Google sign-in could not be verified.' }, 401);
  }
}
