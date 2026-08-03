import { authJson, getOrCreateCsrf, readAuthSession } from '../../_lib/auth.js';

export async function onRequestGet({ request, env }) {
  const session = await readAuthSession(request, env);
  const csrf = getOrCreateCsrf(request);

  return authJson(
    {
      user: session
        ? { email: session.email, name: session.name, picture: session.picture }
        : null,
      csrfToken: csrf.token,
      googleClientId: env.GOOGLE_CLIENT_ID || '',
    },
    200,
    [csrf.cookie],
  );
}
