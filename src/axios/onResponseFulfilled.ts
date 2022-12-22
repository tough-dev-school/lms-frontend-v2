import type { AxiosResponse } from 'axios';
import responseCaseMiddleware from './responseCaseMiddleware';

const onResponseFulfilled = (
  response: AxiosResponse,
  enableCaseMiddleware: boolean,
) => {
  // Convert data keys to target case
  if (response.data) {
    response.data = responseCaseMiddleware(response.data, enableCaseMiddleware);
  }

  return response;
};

export default onResponseFulfilled;
