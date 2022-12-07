import { defineStore } from 'pinia';
import { getStudies } from '@/api/studies';
import type { Study } from '@/types/studies';

interface State {
  items: Study[];
}

const useStudies = defineStore('studies', {
  state: (): State => {
    return {
      items: [],
    };
  },
  actions: {
    async getData() {
      try {
        const { results: items } = await getStudies();
        this.items = items;
      } catch (err) {}
    },
  },
});

export default useStudies;
