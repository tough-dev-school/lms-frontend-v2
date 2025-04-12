import { vi, describe, expect, test } from 'vitest';
import requestCaseMiddleware from './requestCaseMiddleware';
import decamelizeKeys from 'decamelize-keys';
import {
  STATIC_CAMEL_CASE_EXAMPLE,
  STATIC_SNAKE_CASE_EXAMPLE,
} from '@/mocks/mockCase';

vi.mock('decamelize-keys');

const data = STATIC_CAMEL_CASE_EXAMPLE;

describe('requestCaseMiddleware', () => {
  test('run decamelizeKeys when enabled', () => {
    (decamelizeKeys as ReturnType<typeof vi.fn>).mockReturnValue(
      STATIC_SNAKE_CASE_EXAMPLE,
    );
    const result = requestCaseMiddleware(data, true);

    expect(decamelizeKeys).toHaveBeenCalledTimes(1);
    expect(decamelizeKeys).toHaveBeenCalledWith(data, { deep: true });
    expect(result).toStrictEqual(decamelizeKeys(data));
  });

  test('dont run decamelizeKeys when not enabled', () => {
    const result = requestCaseMiddleware(data, false);

    expect(decamelizeKeys).toHaveReturnedTimes(0);
    expect(result).toStrictEqual(data);
  });

  test('return data when enabled', () => {
    (decamelizeKeys as ReturnType<typeof vi.fn>).mockReturnValue(data);

    expect(requestCaseMiddleware(data, true)).toBe(data);
  });

  test('return data when not enabled', () => {
    expect(requestCaseMiddleware(data, false)).toBe(data);
  });
});
