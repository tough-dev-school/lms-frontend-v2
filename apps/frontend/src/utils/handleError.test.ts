import { describe, beforeEach, expect, test, vi } from 'vitest';
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

vi.mock('@/stores/toasts');

describe('handleError', () => {
  beforeEach(() => {
    (useToasts as ReturnType<typeof vi.fn>).mockReturnValue({
      addMessage: vi.fn(),
    });
  });

  test('calls toast with default message for empty error', () => {
    const { addMessage } = useToasts();
    handleError();

    expect(addMessage).toHaveBeenCalledTimes(1);
    expect(addMessage).toHaveBeenCalledWith(DEFAULT_ERROR_MESSAGE, 'error');
  });

  test('calls toast for text error', () => {
    const message = faker.lorem.sentence();
    const { addMessage } = useToasts();

    handleError(message);

    expect(addMessage).toHaveBeenCalledTimes(1);
    expect(addMessage).toHaveBeenCalledWith(message, 'error');
  });

  test('calls toast for error', () => {
    const message = faker.lorem.sentence();
    const { addMessage } = useToasts();
    const error = createError({
      details: message,
    });

    handleError(error);

    expect(addMessage).toHaveBeenCalledTimes(1);
    expect(addMessage).toHaveBeenCalledWith(message, 'error');
  });

  test('calls toast for each error in array', () => {
    const messages = Array.from({ length: 10 }).map(() =>
      faker.lorem.sentence(),
    );
    const { addMessage } = useToasts();
    const error = createError({
      details: messages,
    });

    handleError(error);

    expect(addMessage).toBeCalledTimes(messages.length);
  });
});
