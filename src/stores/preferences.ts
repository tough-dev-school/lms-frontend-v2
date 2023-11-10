import { defineStore } from 'pinia';

export enum DarkMode {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

interface State {
  darkMode: DarkMode;
}

const usePreferencesStore = defineStore('preferencesStore', {
  state: (): State => {
    return {
      darkMode: DarkMode.System,
    };
  },
  actions: {
    async setDarkMode(mode: DarkMode) {
      this.darkMode = mode;
    },
  },
  persist: true,
});

export default usePreferencesStore;
