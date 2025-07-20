import { describe, expect, test } from 'vitest';
import onRequestFulfilled from './onRequestFulfilled';
import type { InternalAxiosRequestConfig } from 'axios';
import { faker } from '@faker-js/faker';
import { useAuth } from '@/composables/useAuth';

const input = { data: {}, headers: {} } as InternalAxiosRequestConfig;

describe('onRequestFulfilled', () => {
  test('auth token added to request headers if exist', () => {
    const { token } = useAuth();
    token.value = faker.string.uuid();

    const request = onRequestFulfilled(input);

    expect(request?.headers?.Authorization).toBe(`Bearer ${token.value}`);
  });

  test('auth token is not added to request headers if not exist', () => {
    const { token } = useAuth();
    token.value = undefined;

    const request = onRequestFulfilled(input);

    expect(request?.headers?.Authorization).toBe(undefined);
  });
});
