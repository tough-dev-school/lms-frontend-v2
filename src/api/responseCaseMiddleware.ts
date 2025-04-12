import camelcaseKeys from 'camelcase-keys';

const responseCaseMiddleware = (
  data: Record<string, any> | any[],
  enable = true,
) => (enable ? camelcaseKeys(data, { deep: true }) : data);

export default responseCaseMiddleware;
