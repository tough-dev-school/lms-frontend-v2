import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { loginWithCredentials, loginWithLink, sendLoginLink } from '@/api/auth';
import { faker } from '@faker-js/faker';
import useAuth from './auth';
import { createApp } from 'vue';
import { vi, describe, beforeEach, expect, test } from 'vitest';

const token = faker.string.uuid();
const passwordlessToken = faker.string.uuid();
const username = faker.internet.userName();
const password = faker.internet.password();
const email = faker.internet.email();

vi.mock('@/api/auth', () => {
  return {
    loginWithCredentials: vi.fn(),
    sendLoginLink: vi.fn(),
    loginWithLink: vi.fn(),
  };
});

describe('toasts store', () => {
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false });
    app.use(pinia);
    setActivePinia(pinia);

    auth = useAuth();
  });

  test('loginWithCredentials calls api with needed parameters', async () => {
    await auth.loginWithCredentials(username, password);

    expect(loginWithCredentials).toHaveBeenCalledTimes(1);
    expect(loginWithCredentials).toHaveBeenCalledWith(username, password);
  });

  test('loginWithCredentials sets token', async () => {
    (loginWithCredentials as ReturnType<typeof vi.fn>).mockResolvedValue({
      token,
    });
    await auth.loginWithCredentials(username, password);

    expect(auth.token).toBe(token);
  });

  test('loginWithEmail calls api with needed parameters', () => {
    auth.loginWithEmail(email);

    expect(sendLoginLink).toHaveBeenCalledTimes(1);
    expect(sendLoginLink).toHaveBeenCalledWith(email);
  });

  test('exchangeTokens calls api with needed parameters', async () => {
    await auth.exchangeTokens(passwordlessToken);

    expect(loginWithLink).toHaveBeenCalledTimes(1);
    expect(loginWithLink).toHaveBeenCalledWith(passwordlessToken);
  });

  test('exchangeTokens sets token', async () => {
    (loginWithLink as ReturnType<typeof vi.fn>).mockResolvedValue({ token });
    await auth.exchangeTokens(passwordlessToken);

    expect(auth.token).toBe(token);
  });

  test('resetAuth resets token', () => {
    auth.token = faker.string.uuid();

    auth.removeToken();

    expect(auth.token).toBe(undefined);
  });
});
