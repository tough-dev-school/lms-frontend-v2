import { defineStore } from 'pinia';
import { usePreferredDark, useLocalStorage } from '@vueuse/core';
import type { RemovableRef } from '@vueuse/core';

export enum DarkMode {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

interface State {
  darkMode: RemovableRef<DarkMode>;
}

const usePreferencesStore = defineStore('preferencesStore', {
  state: (): State => {
    return {
      darkMode: useLocalStorage<DarkMode>('darkMode', DarkMode.System),
    };
  },
  actions: {
    async setDarkMode(mode: DarkMode) {
      this.darkMode = mode;
    },
  },
  getters: {
    isDark: (state): boolean => {
      const isPreferredDark = usePreferredDark();

      if (state.darkMode === DarkMode.System) {
        return isPreferredDark.value;
      }
      if (state.darkMode === DarkMode.Light) {
        return false;
      }
      if (state.darkMode === DarkMode.Dark) {
        return true;
      }
      return false;
    },
  },
});

export default usePreferencesStore;
