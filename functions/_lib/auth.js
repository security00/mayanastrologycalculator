import { SignJWT, createRemoteJWKSet, jwtVerify } from 'jose';

const GOOGLE_JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];
const SESSION_COOKIE = 'mayan_google_session';
const CSRF_COOKIE = 'mayan_auth_csrf';
const SESSION_ISSUER = 'mayanastrologycalculator.com';
const SESSION_AUDIENCE = 'mayan-report-checkout';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function secretKey(secret) {
  return new TextEncoder().encode(secret);
}

function parseCookies(request) {
  const cookieHeader = request.headers.get('Cookie') || '';
  return cookieHeader.split(';').reduce((cookies, part) => {
    const separatorIndex = part.indexOf('=');
    if (separatorIndex === -1) return cookies;

    const name = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();
    if (name) cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
}

function cookieAttributes(request, maxAge) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}

export async function verifyGoogleCredential(credential, env) {
  if (!env.GOOGLE_CLIENT_ID) {
    throw new Error('Google sign-in is not configured.');
  }

  const { payload } = await jwtVerify(credential, GOOGLE_JWKS, {
    audience: env.GOOGLE_CLIENT_ID,
    issuer: GOOGLE_ISSUERS,
  });

  if (!payload.sub || typeof payload.email !== 'string' || payload.email_verified !== true) {
    throw new Error('Google did not provide a verified email address.');
  }

  return {
    sub: payload.sub,
    email: payload.email.toLowerCase(),
    name: typeof payload.name === 'string' ? payload.name : '',
    picture: typeof payload.picture === 'string' ? payload.picture : '',
  };
}

export async function createAuthSessionToken(user, env) {
  if (!env.AUTH_SESSION_SECRET) {
    throw new Error('Auth session secret is not configured.');
  }

  return new SignJWT({
    email: user.email,
    name: user.name || '',
    picture: user.picture || '',
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(user.sub)
    .setIssuer(SESSION_ISSUER)
    .setAudience(SESSION_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secretKey(env.AUTH_SESSION_SECRET));
}

export async function readAuthSession(request, env) {
  if (!env.AUTH_SESSION_SECRET) return null;

  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey(env.AUTH_SESSION_SECRET), {
      issuer: SESSION_ISSUER,
      audience: SESSION_AUDIENCE,
    });

    if (!payload.sub || typeof payload.email !== 'string') return null;

    return {
      sub: payload.sub,
      email: payload.email,
      name: typeof payload.name === 'string' ? payload.name : '',
      picture: typeof payload.picture === 'string' ? payload.picture : '',
    };
  } catch {
    return null;
  }
}

export function createSessionCookie(request, token) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes(request, SESSION_MAX_AGE_SECONDS)}`;
}

export function clearSessionCookie(request) {
  return `${SESSION_COOKIE}=; ${cookieAttributes(request, 0)}`;
}

export function getOrCreateCsrf(request) {
  const existingToken = parseCookies(request)[CSRF_COOKIE];
  if (existingToken) {
    return { token: existingToken, cookie: null };
  }

  const token = crypto.randomUUID();
  return {
    token,
    cookie: `${CSRF_COOKIE}=${encodeURIComponent(token)}; ${cookieAttributes(request, SESSION_MAX_AGE_SECONDS)}`,
  };
}

export function validateCsrf(request) {
  const cookieToken = parseCookies(request)[CSRF_COOKIE];
  const headerToken = request.headers.get('X-CSRF-Token');
  return Boolean(cookieToken && headerToken && cookieToken === headerToken);
}

export function isSameOriginRequest(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function authJson(data, status = 200, cookies = []) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  for (const cookie of cookies.filter(Boolean)) headers.append('Set-Cookie', cookie);

  return new Response(JSON.stringify(data), { status, headers });
}
