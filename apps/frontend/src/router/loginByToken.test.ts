import { faker } from '@faker-js/faker';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import loginByToken from './loginByToken';
import useAuth from '@/stores/auth';
import type { RouteLocationNormalized } from 'vue-router';
import { createApp } from 'vue';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';

const passwordlessToken = faker.string.uuid();

const to: Partial<RouteLocationNormalized> = {
  params: {
    passwordlessToken,
  },
};

describe('loginByToken', () => {
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn });
    app.use(pinia);
    setActivePinia(pinia);

    auth = useAuth();
  });

  test('should call exchangeTokens', async () => {
    await loginByToken(to as RouteLocationNormalized);

    expect(auth.exchangeTokens).toHaveBeenCalled();
    expect(auth.exchangeTokens).toHaveBeenCalledWith(passwordlessToken);
  });

  test('should return directions to home', async () => {
    expect(await loginByToken(to as RouteLocationNormalized)).toStrictEqual({
      name: 'home',
    });
  });
});
