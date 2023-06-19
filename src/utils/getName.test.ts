import { faker } from '@faker-js/faker';
import { describe, test, expect } from 'vitest';
import getName from './getName';

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

describe('getName', () => {
  test('returns correct name when first and last names defined', () => {
    expect(getName(firstName, lastName)).toBe(`${firstName} ${lastName}`);
  });

  test('returns correct name when only first name defined', () => {
    expect(getName(firstName, '')).toBe(`${firstName}`);
  });

  test('returns correct name when only last name defined', () => {
    expect(getName('', lastName)).toBe(`${lastName}`);
  });
});
