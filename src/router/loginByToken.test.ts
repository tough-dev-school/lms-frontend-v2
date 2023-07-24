import type { RouteLocationNormalized } from 'vue-router';

import useAuth from '@/stores/auth';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { createApp } from 'vue';

import loginByToken from './loginByToken';

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
