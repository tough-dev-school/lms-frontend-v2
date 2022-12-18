import camelcaseKeys from 'camelcase-keys';

const responseCaseMiddleware = (
  data: object | object[],
  enable: boolean = true,
) => (enable ? camelcaseKeys(data, { deep: true }) : data);

export default responseCaseMiddleware;
