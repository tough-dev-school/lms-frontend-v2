// @vitest-environment node
import { describe, expect, test } from 'vitest';
import { safeRedirectPath } from './auth';

describe('safeRedirectPath', () => {
  test.each(['/courses/1', '/homework/abc?answerId=x', '/settings#avatar'])(
    'keeps local path %s',
    (path) => {
      expect(safeRedirectPath(path)).toBe(path);
    },
  );

  test.each([
    'https://evil.example.com',
    '//evil.example.com/courses',
    // eslint-disable-next-line no-script-url
    'javascript:alert(1)',
    'courses',
    '',
  ])('replaces %s with the course list', (path) => {
    expect(safeRedirectPath(path)).toBe('/courses');
  });

  test.each([undefined, null, 42, ['/courses/1']])(
    'replaces non-string %s with the course list',
    (value) => {
      expect(safeRedirectPath(value)).toBe('/courses');
    },
  );
});
