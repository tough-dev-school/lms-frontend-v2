import { faker } from '@faker-js/faker';
import { afterEach, describe, expect, test } from 'vitest';
import { getName } from './getName';
import { i18n, DEFAULT_LOCALE } from '@/i18n';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const firstNameEn = faker.person.firstName();
const lastNameEn = faker.person.lastName();
const randomName = faker.person.fullName();

afterEach(() => {
  i18n.global.locale.value = DEFAULT_LOCALE;
});

describe('getName in Russian', () => {
  test('returns correct name when first and last names defined', () => {
    expect(getName({ firstName, lastName })).toBe(`${firstName} ${lastName}`);
  });

  test('returns correct name when only first name defined', () => {
    expect(getName({ firstName, lastName: '' })).toBe(`${firstName}`);
  });

  test('returns correct name when only last name defined', () => {
    expect(getName({ firstName: '', lastName })).toBe(`${lastName}`);
  });

  test('ignores English name', () => {
    expect(getName({ firstName, lastName, firstNameEn, lastNameEn })).toBe(
      `${firstName} ${lastName}`,
    );
  });

  test('returns random name when first and last names are empty', () => {
    expect(getName({ firstName: '', lastName: '', randomName })).toBe(
      randomName,
    );
  });

  test('returns random name when first and last names are undefined', () => {
    expect(
      getName({ firstName: undefined, lastName: undefined, randomName }),
    ).toBe(randomName);
  });

  test('prefers custom name over random name', () => {
    expect(getName({ firstName, lastName, randomName })).toBe(
      `${firstName} ${lastName}`,
    );
  });

  test('returns placeholder when all parameters are empty', () => {
    expect(getName({ randomName: null })).toBe('Аноним');
  });
});

describe('getName in English', () => {
  test('returns English name', () => {
    i18n.global.locale.value = 'en';

    expect(getName({ firstName, lastName, firstNameEn, lastNameEn })).toBe(
      `${firstNameEn} ${lastNameEn}`,
    );
  });

  test('returns English first name when English last name is empty', () => {
    i18n.global.locale.value = 'en';

    expect(getName({ firstName, lastName, firstNameEn, lastNameEn: '' })).toBe(
      firstNameEn,
    );
  });

  test('falls back to Russian name when English name is empty', () => {
    i18n.global.locale.value = 'en';

    expect(
      getName({ firstName, lastName, firstNameEn: '', lastNameEn: '' }),
    ).toBe(`${firstName} ${lastName}`);
  });

  test('returns placeholder instead of random name', () => {
    i18n.global.locale.value = 'en';

    expect(getName({ firstName: '', lastName: '', randomName })).toBe(
      'Anonymous',
    );
  });

  test('returns placeholder when all parameters are empty', () => {
    i18n.global.locale.value = 'en';

    expect(getName({ randomName: null })).toBe('Anonymous');
  });
});
