import type { Diploma } from '@/types/diplomas';

import { getDiplomas } from '@/api/diplomas';
import { defineStore } from 'pinia';

interface State {
  items: Diploma[];
}

const useDiplomas = defineStore('diplomas', {
  actions: {
    async getData() {
      try {
        this.items = await getDiplomas();
      } catch (error: any) {}
    },
  },
  state: (): State => ({
    items: [],
  }),
});

export default useDiplomas;
