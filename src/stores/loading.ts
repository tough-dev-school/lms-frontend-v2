import { defineStore } from 'pinia';

interface State {
  isLoading: boolean;
}

const useLoading = defineStore('loading', {
  state: (): State => {
    return {
      isLoading: false,
    };
  },
});

export default useLoading;
