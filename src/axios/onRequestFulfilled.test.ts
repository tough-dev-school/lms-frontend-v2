import type { AxiosRequestConfig } from 'axios';

import useAuth from '@/stores/auth';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { createApp } from 'vue';

import onRequestFulfilled from './onRequestFulfilled';
import requestCaseMiddleware from './requestCaseMiddleware';

vi.mock('./requestCaseMiddleware');

const input = { data: {}, headers: {} } as AxiosRequestConfig;

describe('onRequestFulfilled', () => {
  let authStore: any;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn });
    app.use(pinia);
    setActivePinia(pinia);

    authStore = useAuth();
  });

  test('request data is converted to snake_case', () => {
    onRequestFulfilled(input, true);

    expect(requestCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(requestCaseMiddleware).toHaveBeenCalledWith(input.data, true);
  });

  test('request data coversion can be disabled', () => {
    onRequestFulfilled(input, false);

    expect(requestCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(requestCaseMiddleware).toHaveBeenCalledWith(input.data, false);
  });

  test('auth token added to request headers if exist', () => {
    authStore.token = faker.string.uuid();

    const request = onRequestFulfilled(input, true);

    expect(request?.headers?.Authorization).toBe(`Bearer ${authStore.token}`);
  });

  test('auth token is not added to request headers if not exist', () => {
    authStore.token = undefined;

    const request = onRequestFulfilled(input, true);

    expect(request?.headers?.Authorization).toBe(undefined);
  });
});
