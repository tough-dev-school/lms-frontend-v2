import type { Study } from '@/types/studies';

import { getStudies } from '@/api/studies';
import { defineStore } from 'pinia';

interface State {
  items: Study[];
}

const useStudies = defineStore('studies', {
  actions: {
    async getData() {
      try {
        this.items = await getStudies();
      } catch (err) {}
    },
  },
  state: (): State => {
    return {
      items: [],
    };
  },
});

export default useStudies;
