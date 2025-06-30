import { describe, beforeEach, expect, test } from 'vitest';
import handleError, { DEFAULT_ERROR_MESSAGE } from '@/utils/handleError';
import { faker } from '@faker-js/faker';
import useToasts from '@/stores/toasts';

const createError = (data: object = {}) => {
  return {
    response: {
      data,
    },
  };
};

describe('handleError', () => {
  let toasts: ReturnType<typeof useToasts>;

  beforeEach(() => {
    toasts = useToasts();
  });

  test('calls toast with default message for empty error', () => {
    handleError();

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
    expect(toasts.addMessage).toHaveBeenCalledWith(
      DEFAULT_ERROR_MESSAGE,
      'error',
    );
  });

  test('calls toast for text error', () => {
    const message = faker.lorem.sentence();

    handleError(message);

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
    expect(toasts.addMessage).toHaveBeenCalledWith(message, 'error');
  });

  test('calls toast for error', () => {
    const message = faker.lorem.sentence();
    const error = createError({
      details: message,
    });

    handleError(error);

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
    expect(toasts.addMessage).toHaveBeenCalledWith(message, 'error');
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
