import { vi, describe, beforeEach, expect, test } from 'vitest';
import onResponseFulfilled from './onResponseFulfilled';
import responseCaseMiddleware from './responseCaseMiddleware';
import { createApp } from 'vue';
import type { AxiosResponse } from 'axios';
import { cloneDeep } from 'lodash-es';

vi.mock('./responseCaseMiddleware');

const input = { data: {} } as AxiosResponse;

describe('onResponseFulfilled', () => {
  test('request data is converted to CamelCase', () => {
    onResponseFulfilled(cloneDeep(input), true);

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      cloneDeep(input).data,
      true,
    );
  });

  test('request data conversion can be disabled', () => {
    onResponseFulfilled(cloneDeep(input), false);

    expect(responseCaseMiddleware).toHaveBeenCalledTimes(1);
    expect(responseCaseMiddleware).toHaveBeenCalledWith(
      cloneDeep(input).data,
      false,
    );
  });
});
