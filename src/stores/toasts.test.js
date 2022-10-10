import { describe, test, beforeEach, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useToasts from './toasts.ts';
import { faker } from '@faker-js/faker';

const MESSAGE_ONE = faker.datatype.uuid();
const MESSAGE_TWO = faker.datatype.uuid();
const MESSAGE_THREE = faker.datatype.uuid();

describe('toasts store', () => {
  let toasts;

  beforeEach(() => {
    setActivePinia(createPinia());
    toasts = useToasts();
  });

  const addThreeMessages = () => {
    toasts.addMessage(MESSAGE_ONE);
    toasts.addMessage(MESSAGE_TWO);
    toasts.addMessage(MESSAGE_THREE);
  };

  const findMessageByText = (text) =>
    toasts.messages.find((message) => message.text === text);

  test('no toasts at start', () => {
    expect(toasts.messages).toHaveLength(0);
  });

  test('addMessage adds message', () => {
    const text = faker.datatype.uuid();

    toasts.addMessage(text);

    expect(!!findMessageByText(text)).toBeTruthy();
  });

  test('removeMessage removes message if there is a message with this id', () => {
    addThreeMessages();

    const targetMessage = findMessageByText(MESSAGE_TWO);

    toasts.removeMessage(targetMessage.id);

    expect(!!findMessageByText(MESSAGE_ONE)).toBeTruthy();
    expect(!!findMessageByText(MESSAGE_TWO)).toBeFalsy();
    expect(!!findMessageByText(MESSAGE_THREE)).toBeTruthy();
  });

  test('removeMessage does nothing if no message with this id', () => {
    addThreeMessages();

    toasts.removeMessage('hello world');

    expect(!!findMessageByText(MESSAGE_ONE)).toBeTruthy();
    expect(!!findMessageByText(MESSAGE_TWO)).toBeTruthy();
    expect(!!findMessageByText(MESSAGE_THREE)).toBeTruthy();
  });
});
