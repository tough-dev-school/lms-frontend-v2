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
  const handleLogoutMock = vi.fn();

  beforeEach(() => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      token: ref(faker.string.uuid()),
      handleLogout: handleLogoutMock,
    });
  });

  test('no logout if not 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 400;

    onResponseRejected(error as unknown as AxiosError).catch(() => {});

    expect(handleLogoutMock).toHaveBeenCalledTimes(0);
  });

  test('logout on 401', () => {
    const error = cloneDeep(defaultError);
    error.response.status = 401;

    onResponseRejected(error as unknown as AxiosError).catch(() => {});

    expect(handleLogoutMock).toHaveBeenCalledTimes(1);
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
