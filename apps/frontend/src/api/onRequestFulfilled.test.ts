import { vi, describe, expect, test } from 'vitest';
import onRequestFulfilled from './onRequestFulfilled';
import requestCaseMiddleware from './requestCaseMiddleware';
import type { InternalAxiosRequestConfig } from 'axios';
import { faker } from '@faker-js/faker';
import { useAuth } from '@/stores/auth';

vi.mock('./requestCaseMiddleware');

const input = { data: {}, headers: {} } as InternalAxiosRequestConfig;

describe('onRequestFulfilled', () => {
  test('request data is converted to snake_case', () => {
    onRequestFulfilled(input, true);

    expect(requestCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(requestCaseMiddleware).toHaveBeenCalledWith(input.data, true);
  });

  test('request data conversion can be disabled', () => {
    onRequestFulfilled(input, false);

    expect(requestCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(requestCaseMiddleware).toHaveBeenCalledWith(input.data, false);
  });

  test('auth token added to request headers if exist', () => {
    const { token } = useAuth();
    token.value = faker.string.uuid();

    const request = onRequestFulfilled(input, true);

    expect(request?.headers?.Authorization).toBe(`Bearer ${token.value}`);
  });

  test('auth token is not added to request headers if not exist', () => {
    const { token } = useAuth();
    token.value = undefined;

    const request = onRequestFulfilled(input, true);

    expect(request?.headers?.Authorization).toBe(undefined);
  });
});
