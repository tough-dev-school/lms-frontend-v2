import { describe, test, expect, vi } from 'vitest';
import requestCaseMiddleware from './requestCaseMiddleware';
import decamelizeKeys from 'decamelize-keys';

const data = {};

vi.mock('decamelize-keys');

describe('requestCaseMiddleware', () => {
  test('run camelcaseKeys when enabled', () => {
    requestCaseMiddleware(data, true);

    expect(decamelizeKeys).toHaveBeenCalledOnce();
    expect(decamelizeKeys).toHaveBeenCalledWith(data, { deep: true });
  });

  test('dont run camelcaseKeys when not enabled', () => {
    requestCaseMiddleware(data, false);

    expect(decamelizeKeys).toHaveReturnedTimes(0);
  });

  test('return data when enabled', () => {
    (decamelizeKeys as ReturnType<typeof vi.fn>).mockReturnValue(data);

    expect(requestCaseMiddleware(data, true)).toBe(data);
  });

  test('return data when not enabled', () => {
    expect(requestCaseMiddleware(data, false)).toBe(data);
  });
});
