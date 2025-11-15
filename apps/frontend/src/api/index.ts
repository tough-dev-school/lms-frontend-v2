import onResponseRejected from './onResponseRejected';
import { Api, HttpClient } from './generated/generated-api';
import onRequestFulfilled from './onRequestFulfilled';

export const createHttpClient = () => {
  const httpClient = new HttpClient();

  httpClient.instance.interceptors.request.use((value) =>
    onRequestFulfilled(value),
  );

  httpClient.instance.interceptors.response.use(
    (value) => value,
    (value) => onResponseRejected(value),
  );

  return httpClient;
};

const modernHttpClient = createHttpClient();
export const { api } = new Api(modernHttpClient);
