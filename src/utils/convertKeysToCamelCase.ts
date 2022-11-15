import { isObject, mapKeys, camelCase } from 'lodash';

const convertKeysToCamelCase = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj), (key, value) =>
    isObject(value) ? mapKeys(value, (_value, _key) => camelCase(_key)) : value,
  );
};

export default convertKeysToCamelCase;
