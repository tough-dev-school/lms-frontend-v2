import { defineStore } from 'pinia';

export interface State {
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
