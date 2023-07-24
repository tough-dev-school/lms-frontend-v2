import type { RouteLocationNormalized } from 'vue-router';

import useAuth from '@/stores/auth';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { createApp } from 'vue';

import loginById from './loginById';

const userId = faker.string.uuid();

const to: Partial<RouteLocationNormalized> = {
  params: {
    userId,
  },
};

describe('loginById', () => {
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn });
    app.use(pinia);
    setActivePinia(pinia);

    auth = useAuth();
  });

  test('should call loginWithUserId', async () => {
    await loginById(to as RouteLocationNormalized);

    expect(auth.loginWithUserId).toHaveBeenCalled();
    expect(auth.loginWithUserId).toHaveBeenCalledWith(userId);
  });

  test('should return directions to home', async () => {
    expect(await loginById(to as RouteLocationNormalized)).toStrictEqual({
      name: 'home',
    });
  });
});
