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
        width: 230,
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
    <div className="mb-4 rounded-xl border border-white/20 bg-black/25 p-3.5 text-orange-50">
      {user ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Delivery email: {user.email}</p>
            <p className="mt-1 text-xs text-orange-100/75">
              Google verified this address. You can confirm it again in Stripe.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={authLoading}
            className="self-start text-sm font-semibold text-[#f6dc9f] underline decoration-[#d4a24e]/60 underline-offset-4 hover:text-white disabled:opacity-60"
          >
            Use another email
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 sm:pr-3">
            <p className="text-sm font-semibold text-white">Delivery email</p>
            <p className="mt-1 text-xs text-orange-100/75">
              Enter it in Stripe, or optionally prefill it with Google.
            </p>
          </div>
          <div ref={buttonRef} className="min-h-10 max-w-full shrink-0 overflow-hidden" aria-label="Continue with Google" />
        </div>
      )}
      {authLoading && <p className="mt-2 text-xs text-orange-100/75">Confirming your email...</p>}
      {authError && <p className="mt-2 text-xs font-medium text-red-300">{authError}</p>}
    </div>
  );
}
