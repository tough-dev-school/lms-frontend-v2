import { describe, test, expect, vi } from 'vitest';
import responseCaseMiddleware from './responseCaseMiddleware';
import camelcaseKeys from 'camelcase-keys';

const data = {};

vi.mock('camelcase-keys');

describe('responseCaseMiddleware', () => {
  test('run camelcaseKeys when enabled', () => {
    responseCaseMiddleware(data, true);

    expect(camelcaseKeys).toHaveBeenCalledOnce();
    expect(camelcaseKeys).toHaveBeenCalledWith(data, { deep: true });
  });

  test('dont run camelcaseKeys when not enabled', () => {
    responseCaseMiddleware(data, false);

    expect(camelcaseKeys).toHaveReturnedTimes(0);
  });

  test('return data when enabled', () => {
    (camelcaseKeys as ReturnType<typeof vi.fn>).mockReturnValue(data);

    expect(responseCaseMiddleware(data, true)).toBe(data);
  });

  test('return data when not enabled', () => {
    expect(responseCaseMiddleware(data, false)).toBe(data);
  });
});
