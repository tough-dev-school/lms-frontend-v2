import decamelizeKeys from 'decamelize-keys';

/**
 * @deprecated since transition to generated api we don't need this middleware as it breaks types
 */
const requestCaseMiddleware = (data: object | object[], enable = true) =>
  enable ? decamelizeKeys(data, { deep: true }) : data;

export default requestCaseMiddleware;
