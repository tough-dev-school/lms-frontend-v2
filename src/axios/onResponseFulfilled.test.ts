import onResponseFulfilled from './onResponseFulfilled';
import responseCaseMiddleware from './responseCaseMiddleware';
import { createApp } from 'vue';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import type { AxiosResponse } from 'axios';

vi.mock('./responseCaseMiddleware');

const input = { data: {} } as AxiosResponse;

describe('onResponseFulfilled', () => {
  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn });
    app.use(pinia);
    setActivePinia(pinia);
  });

  test('request data is converted to CamelCase', () => {
    onResponseFulfilled(input, true);

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(input.data, true);
  });

  test('request data coversion can be disabled', () => {
    onResponseFulfilled(input, false);

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(input.data, false);
  });
});
