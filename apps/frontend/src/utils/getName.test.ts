import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'vitest';
import { getName } from './getName';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const randomName = faker.person.fullName();

describe('getName', () => {
  test('returns correct name when first and last names defined', () => {
    expect(getName({ firstName, lastName })).toBe(`${firstName} ${lastName}`);
  });

  test('returns correct name when only first name defined', () => {
    expect(getName({ firstName, lastName: '' })).toBe(`${firstName}`);
  });

  test('returns correct name when only last name defined', () => {
    expect(getName({ firstName: '', lastName })).toBe(`${lastName}`);
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

  test('returns placeholder string when all parameters are empty', () => {
    expect(getName({ randomName: null })).toBe('No name');
  });
});
