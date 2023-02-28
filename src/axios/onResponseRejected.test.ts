import useAuth from '@/stores/auth';
import { test, describe, vi, beforeEach, expect } from 'vitest';
import { createApp } from 'vue';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import onResponseRejected from './onResponseRejected';
import { cloneDeep } from 'lodash';
import responseCaseMiddleware from './responseCaseMiddleware';
import handleError from '@/utils/handleError';
import type { AxiosError } from 'axios';

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
  });

  test('response data is converted to CamelCase', () => {
    const error = cloneDeep(defaultError);

    onResponseRejected(error as unknown as AxiosError, true).catch(() => {});

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      error.response.data,
      true,
    );
  });

  test('response data coversion can be disabled', () => {
    const error = cloneDeep(defaultError);

    onResponseRejected(error as unknown as AxiosError, false).catch(() => {});

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      error.response.data,
      false,
    );
  });

  test('no logout if not 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 400;

    onResponseRejected(error as unknown as AxiosError, true).catch(() => {});

    expect(auth.resetAuth).toHaveBeenCalledTimes(0);
  });

  test('logout on 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 401;

    onResponseRejected(error as unknown as AxiosError, true).catch(() => {});

    expect(auth.resetAuth).toHaveBeenCalledTimes(1);
  });

  test('calls handleError with error for json errors', () => {
    const error = cloneDeep(defaultError);
    error.response.headers['content-type'] = 'application/json; charset=utf-8';

    onResponseRejected(error as unknown as AxiosError, true).catch(() => {});

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith(error);
  });

  test('calls handleError without error non-json errors', () => {
    const error = cloneDeep(defaultError);

    onResponseRejected(error as unknown as AxiosError, true).catch(() => {});

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith();
  });
});
