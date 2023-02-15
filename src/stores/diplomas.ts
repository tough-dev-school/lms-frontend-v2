import { defineStore } from 'pinia';
import type { Diploma } from '@/types/diplomas';
import { getDiplomas } from '@/api/diplomas';

interface State {
  items: Diploma[];
}

const useDiplomas = defineStore('diplomas', {
  state: (): State => ({
    items: [],
  }),
  actions: {
    async getData() {
      try {
        this.items = await getDiplomas();
      } catch (error: any) {}
    },
  },
});

export default useDiplomas;
