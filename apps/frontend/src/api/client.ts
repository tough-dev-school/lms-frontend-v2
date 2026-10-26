export interface RequestConfig<TData = unknown> {
  url?: string;
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';
  params?: object;
  data?: TData | FormData;
  responseType?:
    'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  signal?: AbortSignal;
  headers?: HeadersInit;
}

export interface ResponseConfig<TData = unknown> {
  data: TData;
  status: number;
  statusText: string;
}

export type ResponseErrorConfig<TError = unknown> = TError;

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    super(`API request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

export interface RequestContext {
  baseUrl: string;
  headers: HeadersInit;
}

// Server code renders many users at once, so it supplies the base URL and auth
// headers of the current request. In the browser requests go to the same origin,
// where the server proxies /api/ and adds the auth header from the cookie.
let resolveRequestContext = (): RequestContext => ({
  baseUrl: globalThis.location?.origin ?? '',
  headers: {},
});

export const setRequestContextResolver = (resolver: () => RequestContext) => {
  resolveRequestContext = resolver;
};

const buildUrl = (baseUrl: string, path: string, params?: object) => {
  const url = new URL(path, baseUrl);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    // Django filters take lists as comma separated values
    url.searchParams.set(
      key,
      Array.isArray(value) ? value.join(',') : String(value),
    );
  });

  return url;
};

const buildBody = (data: unknown) => {
  if (data === undefined) return undefined;
  if (data instanceof FormData) return data;
  return JSON.stringify(data);
};

const parseBody = async (response: Response) => {
  const text = await response.text();
  if (!text) return undefined;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

// Generated clients pass the error type too, kubb's client contract has three parameters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = async <TData, _TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
  const { baseUrl, headers } = resolveRequestContext();
  const requestHeaders = new Headers(headers);

  new Headers(config.headers).forEach((value, key) => {
    requestHeaders.set(key, value);
  });

  // fetch sets the multipart boundary itself
  if (config.data !== undefined && !(config.data instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  const response = await fetch(
    buildUrl(baseUrl, config.url ?? '', config.params),
    {
      method: config.method,
      headers: requestHeaders,
      body: buildBody(config.data),
      signal: config.signal,
    },
  );

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return {
    data: data as TData,
    status: response.status,
    statusText: response.statusText,
  };
};

export default client;
