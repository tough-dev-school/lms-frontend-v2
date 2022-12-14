import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

export const convertKeysToCamelCase = (input: object | object[]) =>
  camelcaseKeys(input, { deep: true });

export const convertKeysToSnakeCase = (input: object | object[]) =>
  decamelizeKeys(input, { deep: true });
