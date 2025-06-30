import { loginWithCredentials, loginWithLink, sendLoginLink } from '@/api/auth';
import { faker } from '@faker-js/faker';
import { useAuth } from './auth';
import { vi, describe, expect, test } from 'vitest';

const passwordlessToken = faker.string.uuid();
const username = faker.internet.userName();
const password = faker.internet.password();
const email = faker.internet.email();

vi.mock('@/api/auth');

describe('toasts store', () => {
  test('loginWithCredentials calls api with needed parameters', async () => {
    const { loginWithCredentials: login } = useAuth();
    await login(username, password);

    expect(loginWithCredentials).toHaveBeenCalledTimes(1);
    expect(loginWithCredentials).toHaveBeenCalledWith(username, password);
  });

  test('loginWithCredentials sets token', async () => {
    const expectedValue = faker.string.uuid();
    (loginWithCredentials as ReturnType<typeof vi.fn>).mockResolvedValue({
      token: expectedValue,
    });
    const { token, loginWithCredentials: login } = useAuth();

    await login(username, password);

    expect(token.value).toBe(expectedValue);
  });

  test('loginWithEmail calls api with needed parameters', () => {
    const { loginWithEmail: login } = useAuth();
    login(email);

    expect(sendLoginLink).toHaveBeenCalledTimes(1);
    expect(sendLoginLink).toHaveBeenCalledWith(email);
  });

  test('exchangeTokens calls api with needed parameters', async () => {
    const { exchangeTokens } = useAuth();

    await exchangeTokens(passwordlessToken);

    expect(loginWithLink).toHaveBeenCalledTimes(1);
    expect(loginWithLink).toHaveBeenCalledWith(passwordlessToken);
  });

  test('exchangeTokens sets token', async () => {
    const expectedValue = faker.string.uuid();

    (loginWithLink as ReturnType<typeof vi.fn>).mockResolvedValue({
      token: expectedValue,
    });
    const { token, exchangeTokens } = useAuth();

    await exchangeTokens(passwordlessToken);

    expect(token.value).toBe(expectedValue);
  });

  test('resetAuth resets token', () => {
    const { token, removeToken } = useAuth();

    token.value = faker.string.uuid();

    removeToken();

    expect(token.value).toBe(undefined);
  });
});
