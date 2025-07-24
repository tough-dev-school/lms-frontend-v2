import { useAuth } from '@/composables/useAuth';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import onResponseRejected from './onResponseRejected';
import { cloneDeep } from 'lodash-es';
import handleError from '@/utils/handleError';
import type { AxiosError } from 'axios';
import { faker } from '@faker-js/faker';
import { ref } from 'vue';

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
vi.mock('@/composables/useAuth');

describe('custom axios', () => {
  const tokenValue = faker.string.uuid();

  beforeEach(() => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      token: ref(tokenValue),
    });
  });

  test('no logout if not 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 400;
    const { token } = useAuth();

    onResponseRejected(error as unknown as AxiosError).catch(() => {});

    expect(token.value).toBeDefined();
  });

  test('logout on 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 401;
    const { token } = useAuth();

    onResponseRejected(error as unknown as AxiosError).catch(() => {});

    expect(token.value).toBeUndefined();
  });

  test('calls handleError with error for json errors', () => {
    const error = cloneDeep(defaultError);
    error.response.headers['content-type'] = 'application/json; charset=utf-8';

    onResponseRejected(error as unknown as AxiosError).catch(() => {});

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith(error);
  });

  test('calls handleError without error non-json errors', () => {
    const error = cloneDeep(defaultError);

    onResponseRejected(error as unknown as AxiosError).catch(() => {});

    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError).toHaveBeenCalledWith();
  });
});
