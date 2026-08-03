'use client';

import { useEffect, useRef, useState } from 'react';

type GoogleCredentialResponse = {
  credential: string;
};

type GoogleIdentityServices = {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
        context?: string;
      }) => void;
      renderButton: (
        element: HTMLElement,
        options: Record<string, string | number | boolean>,
      ) => void;
    };
  };
};

type AuthUser = {
  email: string;
  name: string;
  picture: string;
};

type SessionResponse = {
  user: AuthUser | null;
  csrfToken: string;
  googleClientId: string;
};

type AnalyticsWindow = Window & {
  google?: GoogleIdentityServices;
  gtag?: (command: string, eventName: string, params?: Record<string, string>) => void;
};

const GOOGLE_SCRIPT_ID = 'google-identity-services';

export default function GoogleEmailSignIn() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [googleClientId, setGoogleClientId] = useState('');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    let active = true;

    fetch('/api/auth/session', { credentials: 'same-origin', cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not load sign-in status.');
        return response.json() as Promise<SessionResponse>;
      })
      .then((session) => {
        if (!active) return;
        setUser(session.user);
        setCsrfToken(session.csrfToken);
        setGoogleClientId(session.googleClientId);
      })
      .catch(() => {
        if (active) setAuthError('Google sign-in is temporarily unavailable. You can still continue as a guest.');
      })
      .finally(() => {
        if (active) setSessionLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!googleClientId || user || !csrfToken || !buttonRef.current) return;

    let active = true;
    const analyticsWindow = window as AnalyticsWindow;

    const handleCredential = async ({ credential }: GoogleCredentialResponse) => {
      if (!active) return;
      setAuthLoading(true);
      setAuthError('');

      try {
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({ credential }),
        });
        const data = (await response.json()) as { user?: AuthUser; error?: string };
        if (!response.ok || !data.user) throw new Error(data.error || 'Google sign-in failed.');

        setUser(data.user);
        analyticsWindow.gtag?.('event', 'google_email_sign_in', {
          method: 'google_identity_services',
        });
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : 'Google sign-in failed.');
      } finally {
        setAuthLoading(false);
      }
    };

    const renderGoogleButton = () => {
      if (!active || !buttonRef.current || !analyticsWindow.google) return;

      buttonRef.current.replaceChildren();
      analyticsWindow.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredential,
        context: 'use',
      });
      analyticsWindow.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: 320,
      });
    };

    if (analyticsWindow.google) {
      renderGoogleButton();
    } else {
      let script = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = GOOGLE_SCRIPT_ID;
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener('load', renderGoogleButton, { once: true });
    }

    return () => {
      active = false;
    };
  }, [csrfToken, googleClientId, user]);

  const handleLogout = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'X-CSRF-Token': csrfToken },
      });
      if (!response.ok) throw new Error('Could not sign out.');
      setUser(null);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Could not sign out.');
    } finally {
      setAuthLoading(false);
    }
  };

  if (!sessionLoaded || (!googleClientId && !user)) return null;

  return (
    <div className="mb-5 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
      {user ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Signed in as {user.email}</p>
            <p className="mt-1 text-xs text-orange-100">
              This verified email will be prefilled securely in Stripe.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={authLoading}
            className="self-start text-sm font-semibold text-white underline decoration-orange-200 underline-offset-4 disabled:opacity-60"
          >
            Use another email
          </button>
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm font-semibold text-white">
            Save a step at checkout
          </p>
          <div ref={buttonRef} className="min-h-10 max-w-full overflow-hidden" aria-label="Continue with Google" />
          <p className="mt-2 text-xs text-orange-100">
            Optional - you can continue as a guest and enter any delivery email in Stripe.
          </p>
        </>
      )}
      {authLoading && <p className="mt-2 text-xs text-orange-100">Confirming your email...</p>}
      {authError && <p className="mt-2 text-xs font-medium text-yellow-100">{authError}</p>}
    </div>
  );
}
