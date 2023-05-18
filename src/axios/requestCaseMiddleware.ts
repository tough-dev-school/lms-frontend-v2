import decamelizeKeys from 'decamelize-keys';

const requestCaseMiddleware = (data: object | object[], enable = true) =>
  enable ? decamelizeKeys(data, { deep: true }) : data;

export default requestCaseMiddleware;
