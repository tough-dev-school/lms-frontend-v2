import onResponseRejected from './onResponseRejected';
import onRequestFulfilled from './onRequestFulfilled';
import axios from 'axios';

export interface RequestConfig<TData = unknown> {
  url?: string;
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';
  params?: object;
  data?: TData | FormData;
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export interface ResponseConfig<TData = unknown> {
  data: TData;
  status: number;
  statusText: string;
}

export const createHttpClient = () => {
  const httpClient = axios.create();

  httpClient.interceptors.request.use((value) => onRequestFulfilled(value));

  httpClient.interceptors.response.use(
    (value) => value,
    (value) => onResponseRejected(value),
  );

  return httpClient;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
  const httpClient = createHttpClient();

  // @ts-expect-error axios types are not compatible with our request config
  const response = await httpClient({
    ...config,
  });

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};

export default client;
