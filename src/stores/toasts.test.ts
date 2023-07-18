import { createPinia, setActivePinia } from 'pinia';
import useToasts, { type VToastMessage } from './toasts';
import { faker } from '@faker-js/faker';

const MESSAGE_ONE = faker.string.uuid();
const MESSAGE_TWO = faker.string.uuid();
const MESSAGE_THREE = faker.string.uuid();

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

  const getTexts = () => toasts.messages.map((message) => message.text);

  const findMessageByText = (text: string) =>
    toasts.messages.find((message: VToastMessage) => message.text === text);

  test('no toasts at start', () => {
    expect(toasts.messages).toHaveLength(0);
  });

  test('addMessage adds message', () => {
    const text = faker.string.uuid();

    toasts.addMessage(text);

    expect(getTexts()).toContain(text);
  });

  test('removeMessage removes message if there is a message with given id', () => {
    addDefaultMessages();

    const targetMessage = findMessageByText(MESSAGE_TWO);

    toasts.removeMessage((targetMessage as VToastMessage).id); //# FIXME

    expect(getTexts()).toContain(MESSAGE_ONE);
    expect(getTexts()).not.toContain(MESSAGE_TWO);
    expect(getTexts()).toContain(MESSAGE_THREE);
  });

  test('removeMessage does nothing if no message with given id', () => {
    addDefaultMessages();

    toasts.removeMessage('hello world');

    expect(getTexts()).toContain(MESSAGE_ONE);
    expect(getTexts()).toContain(MESSAGE_TWO);
    expect(getTexts()).toContain(MESSAGE_THREE);
  });

  test('toasts can be disabled', () => {
    toasts.disable();

    expect(toasts.disabled).toBe(true);
  });

  test('addMessage does nothing if disabled', () => {
    const text = faker.string.uuid();

    toasts.disable();
    toasts.addMessage(text);

    expect(getTexts()).not.toContain(text);
  });

  test('toasts can be re-enabled', () => {
    toasts.disable();
    toasts.enable();

    expect(toasts.disabled).toBe(false);
  });
});
