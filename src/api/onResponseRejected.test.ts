import useAuth from '@/stores/auth';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import { createApp } from 'vue';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import onResponseRejected from './onResponseRejected';
import { cloneDeep } from 'lodash-es';
import responseCaseMiddleware from './responseCaseMiddleware';
import type { AxiosError } from 'axios';
import { faker } from '@faker-js/faker';

const defaultError = {
  response: {
    status: 400,
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
    data: { details: 'really bad thing' },
  },
};

vi.mock('@/utils/handleError');
vi.mock('./responseCaseMiddleware');

describe('custom axios', () => {
  let auth: ReturnType<typeof useAuth>;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn });
    app.use(pinia);
    setActivePinia(pinia);

    auth = useAuth();
    auth.token = faker.string.uuid();
  });

  test('response data is converted to CamelCase', () => {
    onResponseRejected(
      cloneDeep(defaultError) as unknown as AxiosError,
      true,
    ).catch(() => {});

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      cloneDeep(defaultError).response.data,
      true,
    );
  });

  test('response data coversion can be disabled', () => {
    onResponseRejected(
      cloneDeep(defaultError) as unknown as AxiosError,
      false,
    ).catch(() => {});

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      cloneDeep(defaultError).response.data,
      false,
    );
  });

  test('no logout if not 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 400;

    onResponseRejected(error as unknown as AxiosError, true).catch(() => {});

    expect(auth.removeToken).toHaveBeenCalledTimes(0);
  });

  test('logout on 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 401;

    onResponseRejected(error as unknown as AxiosError, true).catch(() => {});

    expect(auth.removeToken).toHaveBeenCalledTimes(1);
  });
});
