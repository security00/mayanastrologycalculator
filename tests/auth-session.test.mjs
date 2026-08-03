import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createAuthSessionToken,
  createSessionCookie,
  getOrCreateCsrf,
  isSameOriginRequest,
  readAuthSession,
  validateCsrf,
} from '../functions/_lib/auth.js';

const env = {
  AUTH_SESSION_SECRET: 'test-secret-that-is-long-enough-for-hmac-signing-123456789',
};

test('signed auth sessions preserve the verified Google email', async () => {
  const token = await createAuthSessionToken(
    {
      sub: 'google-user-123',
      email: 'reader@example.com',
      name: 'Reader',
      picture: 'https://example.com/avatar.png',
    },
    env,
  );
  const initialRequest = new Request('https://mayanastrologycalculator.com/result');
  const cookie = createSessionCookie(initialRequest, token).split(';')[0];
  const request = new Request('https://mayanastrologycalculator.com/api/auth/session', {
    headers: { Cookie: cookie },
  });

  const session = await readAuthSession(request, env);
  assert.equal(session?.sub, 'google-user-123');
  assert.equal(session?.email, 'reader@example.com');
  assert.equal(session?.name, 'Reader');
});

test('tampered auth sessions are rejected', async () => {
  const token = await createAuthSessionToken(
    { sub: 'google-user-123', email: 'reader@example.com' },
    env,
  );
  const tamperedToken = token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a');
  const request = new Request('https://mayanastrologycalculator.com/api/auth/session', {
    headers: { Cookie: 'mayan_google_session=' + tamperedToken },
  });

  assert.equal(await readAuthSession(request, env), null);
});

test('CSRF validation requires matching cookie and header tokens', () => {
  const initialRequest = new Request('https://mayanastrologycalculator.com/api/auth/session');
  const csrf = getOrCreateCsrf(initialRequest);
  const cookie = csrf.cookie.split(';')[0];
  const validRequest = new Request('https://mayanastrologycalculator.com/api/auth/google', {
    method: 'POST',
    headers: {
      Cookie: cookie,
      Origin: 'https://mayanastrologycalculator.com',
      'X-CSRF-Token': csrf.token,
    },
  });
  const invalidRequest = new Request('https://mayanastrologycalculator.com/api/auth/google', {
    method: 'POST',
    headers: {
      Cookie: cookie,
      Origin: 'https://malicious.example',
      'X-CSRF-Token': 'wrong-token',
    },
  });

  assert.equal(validateCsrf(validRequest), true);
  assert.equal(isSameOriginRequest(validRequest), true);
  assert.equal(validateCsrf(invalidRequest), false);
  assert.equal(isSameOriginRequest(invalidRequest), false);
});
