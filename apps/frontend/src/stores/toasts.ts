import { uuid } from '@/utils/uuid';
import { createGlobalState } from '@vueuse/core';
import { ref } from 'vue';

type VToastType = 'error' | 'success' | undefined;

export class VToastMessage {
  text: string;
  id: string;
  lifetime: number;
  type: VToastType;

  constructor(text: string, type?: VToastType, lifetime = 5000) {
    this.text = text;
    this.type = type;
    this.id = uuid();
    this.lifetime = lifetime;
  }
}

const useToasts = createGlobalState(() => {
  const messages = ref<VToastMessage[]>([]);
  const disabled = ref(false);

  const addMessage = (text: string, type?: VToastType) => {
    if (disabled.value) {return;}
    messages.value = [...messages.value, new VToastMessage(text, type)];
  };

  const removeMessage = (id: string) => {
    messages.value = messages.value.filter((message) => message.id !== id);
  };

  const enable = () => {
    disabled.value = false;
  };

  const disable = () => {
    messages.value = [];
    disabled.value = true;
  };

  return {
    messages,
    disabled,
    addMessage,
    removeMessage,
    enable,
    disable,
  };
});

export default useToasts;
