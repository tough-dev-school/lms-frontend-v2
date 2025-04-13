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
  getters: {
    getStudyById: (state) => (id: number) =>
      state.items.find((item) => item.id === id),
  },
  actions: {
    async getData() {
      try {
        this.items = await getStudies();
      } catch (err) {}
    },
  },
});

export default useStudies;
