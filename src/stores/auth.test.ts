import { describe, test, beforeEach, expect, vi } from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { loginWithCredentials, loginWithLink, sendLoginLink } from '@/api/auth';
import { faker } from '@faker-js/faker';
import useAuth from './auth';
import useToasts from './toasts';
import { createApp } from 'vue';

const token = faker.datatype.uuid();
const passwordlessToken = faker.datatype.uuid();
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
  let toasts: ReturnType<typeof useToasts>;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false });
    app.use(pinia);
    setActivePinia(pinia);

    auth = useAuth();
    toasts = useToasts();
  });

  test('loginWithCredentials calls api with needed parameters', async () => {
    await auth.loginWithCredentials(username, password);

    expect(loginWithCredentials).toHaveBeenCalledOnce();
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

    expect(sendLoginLink).toHaveBeenCalledOnce();
    expect(sendLoginLink).toHaveBeenCalledWith(email);
  });

  test('loginWithEmail does not show toast on fail', async () => {
    (sendLoginLink as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await auth.loginWithEmail(email);

    expect(toasts.addMessage).toHaveBeenCalledTimes(0);
  });

  test('exchangeTokens calls api with needed parameters', async () => {
    await auth.exchangeTokens(passwordlessToken);

    expect(loginWithLink).toHaveBeenCalledOnce();
    expect(loginWithLink).toHaveBeenCalledWith(passwordlessToken);
  });

  test('exchangeTokens sets token', async () => {
    (loginWithLink as ReturnType<typeof vi.fn>).mockResolvedValue({ token });
    await auth.exchangeTokens(passwordlessToken);

    expect(auth.token).toBe(token);
  });

  test('resetAuth resets token', () => {
    auth.token = faker.datatype.uuid();

    auth.resetAuth();

    expect(auth.token).toBe(undefined);
  });
});
