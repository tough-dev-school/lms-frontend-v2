import { setActivePinia, createPinia } from 'pinia';
import { describe, test, expect } from 'vitest';
import usePreferencesStore, { DarkMode } from './preferences';

describe('Preferences Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('initializes with default dark mode', () => {
    const store = usePreferencesStore();
    expect(store.darkMode).toBe(DarkMode.System);
  });

  test('sets dark mode to light', async () => {
    const store = usePreferencesStore();
    await store.setDarkMode(DarkMode.Light);
    expect(store.darkMode).toBe(DarkMode.Light);
  });

  test('sets dark mode to dark', async () => {
    const store = usePreferencesStore();
    await store.setDarkMode(DarkMode.Dark);
    expect(store.darkMode).toBe(DarkMode.Dark);
  });

  test('isDark returns correct value based on dark mode', () => {
    const store = usePreferencesStore();

    store.darkMode = DarkMode.System;
    expect(store.isDark).toBe(false);

    store.darkMode = DarkMode.Light;
    expect(store.isDark).toBe(false);

    store.darkMode = DarkMode.Dark;
    expect(store.isDark).toBe(true);
  });
});
