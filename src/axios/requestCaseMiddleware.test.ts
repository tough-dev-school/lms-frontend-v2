import { describe, test, expect, vi } from 'vitest';
import requestCaseMiddleware from './requestCaseMiddleware';
import decamelizeKeys from 'decamelize-keys';
import {
  STATIC_CAMEL_CASE_EXAMPLE,
  STATIC_SNAKE_CASE_EXAMPLE,
} from '@/mocks/mockCase';

const data = STATIC_CAMEL_CASE_EXAMPLE;

vi.mock('decamelize-keys');

describe('requestCaseMiddleware', () => {
  test('run decamelizeKeys when enabled', () => {
    const result = requestCaseMiddleware(data, true);

    expect(decamelizeKeys).toHaveBeenCalledOnce();
    expect(decamelizeKeys).toHaveBeenCalledWith(data, { deep: true });
    expect(result).toStrictEqual(STATIC_SNAKE_CASE_EXAMPLE);
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
