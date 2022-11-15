import { describe, test, expect } from 'vitest';
import convertKeysToCamelCase from './convertKeysToCamelCase';

const snakeCaseExample = {
  first_name: 'John',
  last_name: 'Doe',
};

const snakeCaseExampleResult = {
  firstName: 'John',
  lastName: 'Doe',
};

const nestedExample = {
  person_data: {
    first_name: 'John',
    last_name: 'Doe',
  },
};

const nestedExampleResult = {
  personData: {
    firstName: 'John',
    lastName: 'Doe',
  },
};

describe('utils/convertKeysToCamelCase', () => {
  test('snake case converted', () => {
    expect(convertKeysToCamelCase(snakeCaseExample)).toStrictEqual(
      snakeCaseExampleResult,
    );
  });

  test('nested properties converted', () => {
    expect(convertKeysToCamelCase(nestedExample)).toStrictEqual(
      nestedExampleResult,
    );
  });
});
