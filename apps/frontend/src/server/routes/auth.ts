import { Hono } from 'hono';
import type { Context } from 'hono';
import { isApiError } from '@/api/client';
import {
  authAsRetrieve,
  authPasswordResetConfirmCreate,
  authPasswordResetCreate,
  authPasswordlessTokenRequestRetrieve,
  authPasswordlessTokenRetrieve,
  authTokenCreate,
  usersMeRetrieve,
} from '@/api/generated';
import { urls } from '@/urls';
import { clearToken, guestOnly, safeRedirectPath, setToken } from '../auth';
import { readBody, readString } from '../body';
import {
  redirectBack,
  redirectBackWithErrors,
  redirectWithErrors,
  submitForm,
} from '../forms';
import type { AppEnv } from '../types';

// An expired magic link should land on the login form with a reason, not on an error page
const exchangeToken = async (
  c: Context<AppEnv>,
  exchange: () => Promise<{ token?: string }>,
) => {
  try {
    const { token } = await exchange();
    if (!token) throw new Error('Backend returned no token');
    setToken(c, token);
    return c.redirect(urls.courses());
  } catch (error) {
    if (!isApiError(error)) throw error;
    // The backend answers a dead link with whatever its view returns, the login page has its own wording
    return redirectWithErrors(c, urls.login(), { link: 'expired' });
  }
};

export const auth = new Hono<AppEnv>()
  .get('/login', guestOnly, (c) =>
    c.var.inertia.render('VLoginView', {
      redirectTo: c.req.query('redirectTo') ?? null,
    }),
  )
  .post('/login/password', guestOnly, async (c) => {
    const body = await readBody(c);

    return submitForm(c, async () => {
      const { token } = await authTokenCreate({
        username: readString(body, 'username'),
        password: readString(body, 'password'),
      });

      if (!token) {
        return redirectBackWithErrors(c, { non_field_errors: 'No token' });
      }

      setToken(c, token);
      return c.redirect(safeRedirectPath(body.redirectTo), 303);
    });
  })
  // TODO: remove after 2027-04-26. The previous version of the app kept the token in localStorage,
  // the login page hands it over once so students don't have to log in again.
  .post('/login/token', guestOnly, async (c) => {
    const body = await readBody(c);
    const token = readString(body, 'token');

    try {
      await usersMeRetrieve({ headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      if (isApiError(error) && [401, 403].includes(error.status)) {
        return redirectBack(c, urls.login());
      }
      throw error;
    }

    setToken(c, token);
    return c.redirect(safeRedirectPath(body.redirectTo), 303);
  })
  .post('/login/link', guestOnly, async (c) => {
    const email = readString(await readBody(c), 'email');

    return submitForm(c, async () => {
      await authPasswordlessTokenRequestRetrieve(email);
      return c.redirect(urls.mailSent(email), 303);
    });
  })
  .get('/login/mail-sent', guestOnly, (c) =>
    c.var.inertia.render('VMailSentView', {
      email: c.req.query('email') ?? null,
    }),
  )
  .get('/login/reset', guestOnly, (c) =>
    c.var.inertia.render('VLoginResetView'),
  )
  .post('/login/reset', guestOnly, async (c) => {
    const email = readString(await readBody(c), 'email');

    return submitForm(c, async () => {
      await authPasswordResetCreate({ email });
      return c.redirect(urls.mailSent(email), 303);
    });
  })
  // The backend puts these paths into emails, so they stay as they were, trailing slash included
  .get('/auth/password/reset/:uid/:token/', guestOnly, (c) =>
    c.var.inertia.render('VLoginChangeView', {
      uid: c.req.param('uid'),
      token: c.req.param('token'),
    }),
  )
  .post('/auth/password/reset/:uid/:token/', guestOnly, async (c) => {
    const body = await readBody(c);

    return submitForm(c, async () => {
      await authPasswordResetConfirmCreate({
        uid: c.req.param('uid'),
        token: c.req.param('token'),
        new_password1: readString(body, 'new_password1'),
        new_password2: readString(body, 'new_password2'),
      });
      return c.redirect(urls.login(), 303);
    });
  })
  .get('/auth/passwordless/:passwordlessToken', (c) =>
    exchangeToken(c, () =>
      authPasswordlessTokenRetrieve(c.req.param('passwordlessToken')),
    ),
  )
  // Staff open this to see the LMS as a student, it needs the staff token to work
  .get('/auth/as/:userId', (c) =>
    exchangeToken(c, () => authAsRetrieve(Number(c.req.param('userId')))),
  )
  .post('/logout', (c) => {
    clearToken(c);
    return c.redirect(urls.login(), 303);
  })
  .get('/logout', (c) => {
    clearToken(c);
    return c.redirect(urls.login());
  });
