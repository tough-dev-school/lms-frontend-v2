import { describe, beforeEach, expect, test, vi } from 'vitest';
import handleError from '@/utils/handleError';
import { faker } from '@faker-js/faker';
import { createApp } from 'vue';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import useToasts from '@/stores/toasts';

const createError = (data: object = {}) => {
  return {
    response: {
      data,
    },
  };
};

describe('handleError', () => {
  const app = createApp({});
  let toasts: ReturnType<typeof useToasts>;

  beforeEach(() => {
    const pinia = createTestingPinia({ createSpy: vi.fn });
    app.use(pinia);
    setActivePinia(pinia);
    toasts = useToasts();
  });

  test('calls toast for error', () => {
    const messages = faker.lorem.sentence();
    const error = createError({
      details: messages,
    });

    handleError(error);

    expect(toasts.addMessage).toBeCalledTimes(1);
  });

  test('calls toast for each error in array', () => {
    const messages = [...Array(10)].map(() => faker.lorem.sentence());
    const error = createError({
      details: messages,
    });

    handleError(error);

    expect(toasts.addMessage).toBeCalledTimes(messages.length);
  });
});
