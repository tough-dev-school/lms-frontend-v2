import { describe, test, beforeEach, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useToasts from './toasts';
import { faker } from '@faker-js/faker';
import type { ToastMessage } from './toasts';

const MESSAGE_ONE = faker.datatype.uuid();
const MESSAGE_TWO = faker.datatype.uuid();
const MESSAGE_THREE = faker.datatype.uuid();

const MESSAGES = [MESSAGE_ONE, MESSAGE_TWO, MESSAGE_THREE];

describe('toasts store', () => {
  let toasts: ReturnType<typeof useToasts>;

  beforeEach(() => {
    setActivePinia(createPinia());
    toasts = useToasts();
  });

  const addDefaultMessages = () => {
    MESSAGES.forEach((message) => toasts.addMessage(message));
  };

  const findMessageByText = (text: string) =>
    toasts.messages.find((message: ToastMessage) => message.text === text);

  test('no toasts at start', () => {
    expect(toasts.messages).toHaveLength(0);
  });

  test('addMessage adds message', () => {
    const text = faker.datatype.uuid();

    toasts.addMessage(text);

    expect(!!findMessageByText(text)).toBeTruthy();
  });

  test('removeMessage removes message if there is a message with given id', () => {
    addDefaultMessages();

    const targetMessage = findMessageByText(MESSAGE_TWO);

    toasts.removeMessage((targetMessage as ToastMessage).id); //# FIXME

    expect(!!findMessageByText(MESSAGE_ONE)).toBeTruthy();
    expect(!!findMessageByText(MESSAGE_TWO)).toBeFalsy();
    expect(!!findMessageByText(MESSAGE_THREE)).toBeTruthy();
  });

  test('removeMessage does nothing if no message with given id', () => {
    addDefaultMessages();

    toasts.removeMessage('hello world');

    expect(!!findMessageByText(MESSAGE_ONE)).toBeTruthy();
    expect(!!findMessageByText(MESSAGE_TWO)).toBeTruthy();
    expect(!!findMessageByText(MESSAGE_THREE)).toBeTruthy();
  });

  test.todo('toasts can be disabled');

  test.todo('toasts can be re-enabled');
});
