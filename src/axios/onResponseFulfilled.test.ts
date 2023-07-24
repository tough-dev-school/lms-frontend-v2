import type { AxiosResponse } from 'axios';

import { createTestingPinia } from '@pinia/testing';
import { cloneDeep } from 'lodash';
import { setActivePinia } from 'pinia';
import { createApp } from 'vue';

import onResponseFulfilled from './onResponseFulfilled';
import responseCaseMiddleware from './responseCaseMiddleware';

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
    onResponseFulfilled(cloneDeep(input), true);

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      cloneDeep(input).data,
      true,
    );
  });

  test('request data coversion can be disabled', () => {
    onResponseFulfilled(cloneDeep(input), false);

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      cloneDeep(input).data,
      false,
    );
  });
});
