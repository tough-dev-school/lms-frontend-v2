import { faker } from '@faker-js/faker';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import loginByToken from './loginByToken';
import useAuth from '@/stores/auth';
import type { RouteLocationNormalized } from 'vue-router';
import { createApp } from 'vue';

const passwordlessToken = faker.string.uuid();

const to: Partial<RouteLocationNormalized> = {
  params: {
    passwordlessToken,
  },
};

describe('loginByToken', () => {
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
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
