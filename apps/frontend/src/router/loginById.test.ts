import { faker } from '@faker-js/faker';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import loginById from './loginById';
import useAuth from '@/stores/auth';
import type { RouteLocationNormalized } from 'vue-router';
import { createApp } from 'vue';

const userId = faker.string.uuid();

const to: Partial<RouteLocationNormalized> = {
  params: {
    userId,
  },
};

describe('loginById', () => {
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
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
