// @vitest-environment node
import { describe, expect, test } from 'vitest';
import { toFormErrors } from './forms';

describe('toFormErrors', () => {
  test('joins DRF field messages into one string', () => {
    expect(
      toFormErrors({ email: ['Enter a valid email.', 'Too long.'] }),
    ).toEqual({ email: 'Enter a valid email. Too long.' });
  });

  test('keeps a single message as is', () => {
    expect(toFormErrors({ password: 'Too short' })).toEqual({
      password: 'Too short',
    });
  });

  test('moves detail to non_field_errors', () => {
    expect(toFormErrors({ detail: 'Not allowed' })).toEqual({
      non_field_errors: 'Not allowed',
    });
  });

  test('keeps non_field_errors from DRF', () => {
    expect(toFormErrors({ non_field_errors: ['Unable to log in.'] })).toEqual({
      non_field_errors: 'Unable to log in.',
    });
  });

  test('flattens nested serializer errors with dotted keys', () => {
    expect(toFormErrors({ links: [{ url: ['Bad URL'] }, {}] })).toEqual({
      'links.0.url': 'Bad URL',
    });
  });

  test('turns a plain text body into a non-field error', () => {
    expect(toFormErrors('Bad Gateway')).toEqual({
      non_field_errors: 'Bad Gateway',
    });
  });

  test('has a fallback for an empty body', () => {
    expect(toFormErrors(undefined)).toEqual({
      non_field_errors: 'Unknown error',
    });
  });
});
