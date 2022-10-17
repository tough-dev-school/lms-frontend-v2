import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

type ToastType = 'error' | 'success' | undefined;

export class ToastMessage {
  text: string;
  id: string;
  lifetime: number;
  type: ToastType;

  constructor(
    text: string,
    type: ToastType = undefined,
    lifetime: number = 5000,
  ) {
    this.text = text;
    this.type = type;
    this.id = nanoid(8);
    this.lifetime = lifetime;
  }
}

interface State {
  messages: ToastMessage[];
  disabled: boolean;
}

const useToasts = defineStore('toasts', {
  state: (): State => {
    return { messages: [], disabled: false };
  },
  actions: {
    addMessage(text: string, type: ToastType = undefined) {
      if (this.disabled) return;
      this.messages = [...this.messages, new ToastMessage(text, type)];
    },
    removeMessage(id: String) {
      this.messages = this.messages.filter((message) => message.id !== id);
    },
    disable() {
      this.messages = [];
      this.disabled = true;
    },
    enable() {
      this.disabled = false;
    },
  },
});

export default useToasts;
