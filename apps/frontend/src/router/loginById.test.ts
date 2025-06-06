import { faker } from '@faker-js/faker';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import loginById from './loginById';
import useAuth from '@/stores/auth';
import type { RouteLocationNormalized } from 'vue-router';
import { createApp } from 'vue';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';

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
