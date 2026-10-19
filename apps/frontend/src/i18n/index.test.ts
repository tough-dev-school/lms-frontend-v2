import { describe, expect, test } from 'vitest';
import { isLocale, russianPluralRule } from '@/i18n';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

const getKeys = (messages: object, prefix = ''): string[] =>
  Object.entries(messages).flatMap(([key, value]) =>
    typeof value === 'object'
      ? getKeys(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

describe('locale messages', () => {
  test('en has the same keys as ru', () => {
    expect(getKeys(en).sort()).toEqual(getKeys(ru).sort());
  });

  test.each([
    ['ru', ru],
    ['en', en],
  ])('%s has no empty messages', (_, messages) => {
    const emptyKeys = getKeys(messages).filter(
      (key) =>
        key.split('.').reduce<unknown>(
          // @ts-expect-error walking nested JSON by a dynamic path
          (node, part) => node[part],
          messages,
        ) === '',
    );

    expect(emptyKeys).toEqual([]);
  });
});

describe('russianPluralRule', () => {
  test.each([1, 21, 101])('%i uses the "one" form', (count) => {
    expect(russianPluralRule(count)).toBe(0);
  });

  test.each([2, 4, 22, 104])('%i uses the "few" form', (count) => {
    expect(russianPluralRule(count)).toBe(1);
  });

  test.each([0, 5, 11, 12, 14, 25, 111])('%i uses the "many" form', (count) => {
    expect(russianPluralRule(count)).toBe(2);
  });

  test('fractions use the "few" form', () => {
    expect(russianPluralRule(1.5)).toBe(1);
  });
});

describe('isLocale', () => {
  test.each(['ru', 'en'])('accepts %s', (value) => {
    expect(isLocale(value)).toBe(true);
  });

  test.each(['de', 'RU', '', null, undefined])('rejects %s', (value) => {
    expect(isLocale(value)).toBe(false);
  });
});
