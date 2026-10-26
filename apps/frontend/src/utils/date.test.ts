import { describe, expect, test } from 'vitest';
import dayjs from 'dayjs';
import { formatDate, relativeDate } from './date';
import type { DateOptions } from './date';

const RU: DateOptions = { locale: 'ru', timezone: 'UTC' };
const EN: DateOptions = { locale: 'en', timezone: 'UTC' };

const DATE = '2026-03-02T14:05:09Z';

describe('formatDate', () => {
  describe('in Russian', () => {
    test.each([
      ['date', '02.03.2026'],
      ['dayMonth', '02.03'],
      ['dateTime', '02.03.2026 14:05'],
      ['dateTimeSeconds', '02.03.2026 14:05:09'],
    ] as const)('%s', (format, expected) => {
      expect(formatDate(DATE, RU, format)).toBe(expected);
    });
  });

  describe('in English', () => {
    test.each([
      ['date', '2 Mar 2026'],
      ['dayMonth', '2 Mar'],
      ['dateTime', '2 Mar 2026, 14:05'],
      ['dateTimeSeconds', '2 Mar 2026, 14:05:09'],
    ] as const)('%s', (format, expected) => {
      expect(formatDate(DATE, EN, format)).toBe(expected);
    });
  });

  test('uses the date format by default', () => {
    expect(formatDate(DATE, RU)).toBe('02.03.2026');
  });

  test('shows local time in the given timezone', () => {
    expect(
      formatDate(DATE, { locale: 'ru', timezone: 'Europe/Moscow' }, 'dateTime'),
    ).toBe('02.03.2026 17:05');
  });

  test('moves to the next day across midnight', () => {
    expect(
      formatDate(
        '2026-03-02T22:30:00Z',
        { locale: 'ru', timezone: 'Asia/Tokyo' },
        'date',
      ),
    ).toBe('03.03.2026');
  });

  test('marks UTC time and ignores the timezone', () => {
    expect(
      formatDate(
        DATE,
        { locale: 'ru', timezone: 'Europe/Moscow' },
        'dateTime',
        false,
      ),
    ).toBe('02.03.2026 14:05 UTC');
  });
});

describe('relativeDate', () => {
  test('is in Russian', () => {
    expect(relativeDate(dayjs().subtract(3, 'day'), RU)).toBe('3 дня назад');
  });

  test('is in English', () => {
    expect(relativeDate(dayjs().subtract(3, 'day'), EN)).toBe('3 days ago');
  });
});
