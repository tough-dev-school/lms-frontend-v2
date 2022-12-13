import { isPlainObject, mapKeys, camelCase, snakeCase } from 'lodash';

export const convertKeys = (
  object: Object,
  transformer: Function = (string: string) => string,
) => {
  return JSON.parse(JSON.stringify(object), (key, value) =>
    isPlainObject(value)
      ? mapKeys(value, (_value, _key) => transformer(_key))
      : value,
  );
};

export const convertKeysToCamelCase = (object: Object) =>
  convertKeys(object, camelCase);

export const convertKeysToSnakeCase = (object: Object) =>
  convertKeys(object, snakeCase);
