import useToasts, { type VToastMessage } from './toasts';
import { faker } from '@faker-js/faker';
import { describe, expect, test } from 'vitest';

const MESSAGE_ONE = faker.string.uuid();
const MESSAGE_TWO = faker.string.uuid();
const MESSAGE_THREE = faker.string.uuid();

const MESSAGES = [MESSAGE_ONE, MESSAGE_TWO, MESSAGE_THREE];

const getTexts = (messages: VToastMessage[]) => messages.map((m) => m.text);
const findMessageByText = (text: string, messages: VToastMessage[]) =>
  messages.find((m) => m.text === text);

describe('toasts store', () => {
  const addDefaultMessages = () => {
    const { addMessage } = useToasts();
    MESSAGES.forEach((message) => addMessage(message));
  };

  test('no toasts at start', () => {
    const { messages } = useToasts();

    expect(messages.value).toHaveLength(0);
  });

  test('addMessage adds message', () => {
    const text = faker.string.uuid();

    const { addMessage, messages } = useToasts();

    addMessage(text);

    expect(getTexts(messages.value)).toContain(text);
  });

  test('removeMessage removes message if there is a message with given id', () => {
    addDefaultMessages();

    const { removeMessage, messages } = useToasts();

    const targetMessage = findMessageByText(MESSAGE_TWO, messages.value);

    removeMessage((targetMessage as VToastMessage).id); //# FIXME

    expect(getTexts(messages.value)).toContain(MESSAGE_ONE);
    expect(getTexts(messages.value)).not.toContain(MESSAGE_TWO);
    expect(getTexts(messages.value)).toContain(MESSAGE_THREE);
  });

  test('removeMessage does nothing if no message with given id', () => {
    addDefaultMessages();

    const { removeMessage, messages } = useToasts();

    removeMessage('hello world');

    expect(getTexts(messages.value)).toContain(MESSAGE_ONE);
    expect(getTexts(messages.value)).toContain(MESSAGE_TWO);
    expect(getTexts(messages.value)).toContain(MESSAGE_THREE);
  });

  test('toasts can be disabled', () => {
    const { disabled } = useToasts();

    disabled.value = true;

    expect(disabled.value).toBe(true);
  });

  test('addMessage does nothing if disabled', () => {
    const text = faker.string.uuid();

    const { disabled, addMessage, messages } = useToasts();

    disabled.value = true;
    addMessage(text);

    expect(getTexts(messages.value)).not.toContain(text);
  });

  test('toasts can be re-enabled', () => {
    const { disabled } = useToasts();

    disabled.value = true;
    disabled.value = false;

    expect(disabled.value).toBe(false);
  });
});
