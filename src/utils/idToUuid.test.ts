import { describe, test, expect } from 'vitest';
import idToUuid from './idToUuid';

describe('idToUuid', () => {
  test('returns predicted uuid', () => {
    expect(idToUuid('b3d1f8c33e2d4c0a9e8a3e7f2a2e2c7f')).toBe(
      'b3d1f8c3-3e2d-4c0a-9e8a-3e7f2a2e2c7f',
    );
  });
});
