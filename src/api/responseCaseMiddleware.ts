import camelcaseKeys from 'camelcase-keys';

/**
 * @deprecated since transition to generated api we don't need this middleware as it breaks types
 */
const responseCaseMiddleware = (
  data: Record<string, any> | any[],
  enable = true,
) => (enable ? camelcaseKeys(data, { deep: true }) : data);

export default responseCaseMiddleware;
