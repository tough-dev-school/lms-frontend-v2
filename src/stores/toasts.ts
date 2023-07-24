import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';

type VToastType = 'error' | 'success' | undefined;

export class VToastMessage {
  id: string;
  lifetime: number;
  text: string;
  type: VToastType;

  constructor(text: string, type: VToastType = undefined, lifetime = 5000) {
    this.text = text;
    this.type = type;
    this.id = nanoid(8);
    this.lifetime = lifetime;
  }
}

interface State {
  disabled: boolean;
  messages: VToastMessage[];
}

const useToasts = defineStore('toasts', {
  actions: {
    addMessage(text: string, type: VToastType = undefined) {
      if (this.disabled) return;
      this.messages = [...this.messages, new VToastMessage(text, type)];
    },
    disable() {
      this.messages = [];
      this.disabled = true;
    },
    enable() {
      this.disabled = false;
    },
    removeMessage(id: string) {
      this.messages = this.messages.filter((message) => message.id !== id);
    },
  },
  state: (): State => {
    return { disabled: false, messages: [] };
  },
});

export default useToasts;
