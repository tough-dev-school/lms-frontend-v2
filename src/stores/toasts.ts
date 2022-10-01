import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export class ToastMessage {
  text: string;
  id: string;
  lifetime: number;

  constructor(text: string, lifetime: number = 5000) {
    this.text = text;
    this.id = nanoid(8);
    this.lifetime = lifetime;
  }
}

interface State {
  messages: ToastMessage[];
}

const useToasts = defineStore('toasts', {
  state: (): State => {
    return { messages: [] };
  },
  actions: {
    addMessage(text: string) {
      const message = new ToastMessage(text);
      this.messages = [...this.messages, message];
    },
    removeMessage(id: String) {
      this.messages = this.messages.filter((message) => message.id !== id);
    },
  },
});

export default useToasts;
