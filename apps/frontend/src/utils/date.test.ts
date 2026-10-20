import { afterEach, describe, expect, test } from 'vitest';
import dayjs from 'dayjs';
import { i18n } from '@/i18n';
import { formatDate, relativeDate } from './date';

// Local time without a zone, so the tests don't depend on the machine's timezone
const DATE = '2026-03-02T14:05:09';

describe('formatDate', () => {
  afterEach(() => {
    i18n.global.locale.value = 'ru';
  });

  describe('in Russian', () => {
    test.each([
      ['date', '02.03.2026'],
      ['dayMonth', '02.03'],
      ['dateTime', '02.03.2026 14:05'],
      ['dateTimeSeconds', '02.03.2026 14:05:09'],
    ] as const)('%s', (format, expected) => {
      expect(formatDate(DATE, format)).toBe(expected);
    });
  });

  describe('in English', () => {
    test.each([
      ['date', '2 Mar 2026'],
      ['dayMonth', '2 Mar'],
      ['dateTime', '2 Mar 2026, 14:05'],
      ['dateTimeSeconds', '2 Mar 2026, 14:05:09'],
    ] as const)('%s', (format, expected) => {
      i18n.global.locale.value = 'en';

      expect(formatDate(DATE, format)).toBe(expected);
    });
  });

  test('uses the date format by default', () => {
    expect(formatDate(DATE)).toBe('02.03.2026');
  });

  test('marks UTC time', () => {
    expect(formatDate('2026-03-02T14:05:09Z', 'dateTime', false)).toBe(
      '02.03.2026 14:05 UTC',
    );
  });
});

describe('relativeDate', () => {
  afterEach(() => {
    i18n.global.locale.value = 'ru';
  });

  test('is in Russian', () => {
    expect(relativeDate(dayjs().subtract(3, 'day'))).toBe('3 дня назад');
  });

  test('is in English', () => {
    i18n.global.locale.value = 'en';

    expect(relativeDate(dayjs().subtract(3, 'day'))).toBe('3 days ago');
  });
});
