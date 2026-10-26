// @vitest-environment node
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { PageObject } from '@brachkow/hono-inertia';
import { sign } from 'hono/jwt';
import { STUDENT } from '@/mocks/users';
import app from './index';

const CLEARED_TOKEN = /token=;/;
const COOKIE_EXPIRES = /Expires=([^;]+)/;

// The real SSR needs the real @inertiajs/vue3, which unit tests replace with a mock
vi.mock('@/ssr', () => ({
  renderPage: (page: PageObject) => ({
    head: [],
    body: `<script data-page="app" type="application/json">${JSON.stringify(page)}</script>`,
  }),
}));

const TOKEN = 'header.payload.signature';

const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const fetchMock = vi.fn<typeof fetch>();

const backendPaths = () =>
  fetchMock.mock.calls.map(([input]) => new URL(String(input)).pathname);

const request = (path: string, init: RequestInit = {}, token?: string) =>
  app.request(path, {
    ...init,
    headers: {
      'Accept-Language': 'ru',
      ...(token && { Cookie: `token=${token}` }),
      ...init.headers,
    },
  });

describe('server', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('renders the login page for guests', async () => {
    const response = await request('/login');
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('data-page="app"');
    expect(html).toContain('"component":"VLoginView"');
    expect(html).toContain('<html lang="ru"');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('sends guests from protected pages to login and back', async () => {
    const response = await request('/courses');

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe(
      '/login?redirectTo=%2Fcourses',
    );
  });

  test('sends logged-in students from login to their courses', async () => {
    const response = await request('/login', {}, TOKEN);

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/courses');
  });

  test('renders courses with the token sent to the backend', async () => {
    fetchMock.mockImplementation(async (input) => {
      const { pathname } = new URL(String(input));
      if (pathname === '/api/v2/users/me/') return json(STUDENT);
      return json({ results: [] });
    });

    const response = await request(
      '/courses',
      { headers: { 'X-Inertia': 'true', 'X-Inertia-Version': 'dev' } },
      TOKEN,
    );
    const page = (await response.json()) as PageObject;

    expect(page.component).toBe('VCoursesView');
    expect(page.props.studies).toEqual([]);
    expect(page.props.user).toEqual(STUDENT);
    expect(backendPaths()).toEqual(
      expect.arrayContaining([
        '/api/v2/purchased-courses/',
        '/api/v2/users/me/',
      ]),
    );
    const [, init] = fetchMock.mock.calls[0];
    expect(new Headers(init?.headers).get('Authorization')).toBe(
      `Bearer ${TOKEN}`,
    );
  });

  test('logs out when the backend rejects the token', async () => {
    fetchMock.mockResolvedValue(json({ detail: 'Token expired' }, 401));

    const response = await request('/courses', {}, TOKEN);

    expect(response.headers.get('Location')).toBe(
      '/login?redirectTo=%2Fcourses',
    );
    expect(response.headers.get('Set-Cookie')).toMatch(CLEARED_TOKEN);
  });

  test('clears the token on logout', async () => {
    const response = await request(
      '/logout',
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
      TOKEN,
    );

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('/login');
    expect(response.headers.get('Set-Cookie')).toMatch(CLEARED_TOKEN);
  });

  test('stores the token after a password login', async () => {
    fetchMock.mockResolvedValue(json({ token: TOKEN }));

    const response = await request('/login/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'anna',
        password: 'secret',
        redirectTo: '/courses/1',
      }),
    });

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('/courses/1');
    expect(response.headers.get('Set-Cookie')).toContain(`token=${TOKEN}`);
    expect(response.headers.get('Set-Cookie')).toContain('HttpOnly');
  });

  test('caps the token cookie at the 400 day browser limit', async () => {
    const tenYears = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365 * 10;
    const token = await sign({ exp: tenYears }, 'secret');
    fetchMock.mockResolvedValue(json({ token }));

    const response = await request('/login/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'anna', password: 'secret' }),
    });
    const expires = COOKIE_EXPIRES.exec(
      response.headers.get('Set-Cookie') ?? '',
    )?.[1];

    expect(response.status).toBe(303);
    expect(new Date(expires ?? 0).getTime()).toBeLessThanOrEqual(
      Date.now() + 400 * 24 * 60 * 60 * 1000,
    );
  });

  test('sends backend validation errors back to the form', async () => {
    fetchMock.mockResolvedValue(
      json({ non_field_errors: ['Unable to log in.'] }, 400),
    );

    const response = await request('/login/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'http://localhost/login',
      },
      body: JSON.stringify({ username: 'anna', password: 'wrong' }),
    });

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toBe('/login');
    expect(response.headers.get('Set-Cookie')).toContain('errors=');
  });

  test('proxies the API with the token from the cookie', async () => {
    fetchMock.mockResolvedValue(json({ ok: true }));

    const response = await request('/api/v2/users/me/', {}, TOKEN);

    expect(response.status).toBe(200);
    const [input, init] = fetchMock.mock.calls[0];
    const forwarded = new Request(input, init);
    expect(forwarded.url).toBe('http://127.0.0.1:8000/api/v2/users/me/');
    const { headers } = forwarded;
    expect(headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
    expect(headers.get('Cookie')).toBeNull();
  });

  test('redirects unknown pages to the course list', async () => {
    const response = await request('/no-such-page', {}, TOKEN);

    expect(response.headers.get('Location')).toBe('/courses');
  });
  test('lets the browser send the Referer that redirecting back relies on', async () => {
    const response = await request('/login');

    expect(response.headers.get('Referrer-Policy')).toBe(
      'strict-origin-when-cross-origin',
    );
  });

  test('keeps form errors through a redirect and drops them once a page shows them', async () => {
    const errors = encodeURIComponent(
      JSON.stringify({ non_field_errors: 'Wrong password' }),
    );

    const redirect = await request('/', {
      headers: { Cookie: `errors=${errors}` },
    });
    const rendered = await request('/login', {
      headers: { Cookie: `errors=${errors}` },
    });

    expect(redirect.headers.get('Set-Cookie') ?? '').not.toContain('errors=');
    expect(await rendered.text()).toContain('Wrong password');
    expect(rendered.headers.get('Set-Cookie')).toContain('errors=;');
  });
  test('sends a dead magic link back to login with a reason', async () => {
    fetchMock.mockResolvedValue(json({ detail: 'Not found.' }, 404));

    const response = await request('/auth/passwordless/dead-token');

    expect(response.headers.get('Location')).toBe('/login');
    expect(
      decodeURIComponent(response.headers.get('Set-Cookie') ?? ''),
    ).toContain('errors={"link":"expired"}');
  });
  describe('token from the previous app version', () => {
    const handOver = (token: string) =>
      request('/login/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Referer: 'http://localhost/login?redirectTo=%2Fcourses%2F1',
        },
        body: JSON.stringify({ token, redirectTo: '/courses/1' }),
      });

    test('becomes the session cookie when the backend accepts it', async () => {
      fetchMock.mockResolvedValue(json(STUDENT));

      const response = await handOver(TOKEN);

      const [, init] = fetchMock.mock.calls[0];
      expect(new Headers(init?.headers).get('Authorization')).toBe(
        `Bearer ${TOKEN}`,
      );
      expect(response.status).toBe(303);
      expect(response.headers.get('Location')).toBe('/courses/1');
      expect(response.headers.get('Set-Cookie')).toContain(`token=${TOKEN}`);
    });

    test('is dropped when the backend rejects it', async () => {
      fetchMock.mockResolvedValue(json({ detail: 'Token expired' }, 401));

      const response = await handOver('expired-token');

      expect(response.status).toBe(303);
      expect(response.headers.get('Location')).toBe(
        '/login?redirectTo=%2Fcourses%2F1',
      );
      expect(response.headers.get('Set-Cookie')).toBeNull();
    });
  });
});
