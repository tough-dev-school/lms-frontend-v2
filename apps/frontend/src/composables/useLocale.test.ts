import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import dayjs from 'dayjs';

const setBrowserLanguages = (languages: string[]) => {
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(languages);
};

// useLocale is a global singleton, so every test needs a fresh module
const importUseLocale = async () => {
  vi.resetModules();
  return import('./useLocale');
};

describe('useLocale', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('detects Russian if it is among browser languages', async () => {
    setBrowserLanguages(['en-US', 'ru-RU']);
    const { detectLocale } = await importUseLocale();

    expect(detectLocale()).toBe('ru');
  });

  test('detects English if Russian is not among browser languages', async () => {
    setBrowserLanguages(['de-DE', 'en-US']);
    const { detectLocale } = await importUseLocale();

    expect(detectLocale()).toBe('en');
  });

  test('prefers a stored locale over the browser one', async () => {
    setBrowserLanguages(['ru-RU']);
    localStorage.setItem('locale', 'en');
    const { useLocale } = await importUseLocale();

    const { locale } = useLocale();

    expect(locale.value).toBe('en');
  });

  test('falls back to the browser locale if the stored one is unknown', async () => {
    setBrowserLanguages(['en-US']);
    localStorage.setItem('locale', 'de');
    const { useLocale } = await importUseLocale();

    const { locale } = useLocale();

    expect(locale.value).toBe('en');
  });

  test('stores a picked locale', async () => {
    setBrowserLanguages(['ru-RU']);
    const { useLocale } = await importUseLocale();
    const { locale } = useLocale();

    locale.value = 'en';
    await nextTick();

    expect(localStorage.getItem('locale')).toBe('en');
  });
});

describe('applyLocale', () => {
  afterEach(async () => {
    const { applyLocale } = await import('./useLocale');
    applyLocale('ru');
  });

  test('switches vue-i18n locale', async () => {
    const { applyLocale } = await import('./useLocale');
    // Same module registry as useLocale, which earlier tests have reset
    const { i18n } = await import('@/i18n');

    applyLocale('en');

    expect(i18n.global.locale.value).toBe('en');
  });

  test('switches dayjs locale', async () => {
    const { applyLocale } = await import('./useLocale');

    applyLocale('en');

    expect(dayjs.locale()).toBe('en');
  });

  test('sets the html lang attribute', async () => {
    const { applyLocale } = await import('./useLocale');

    applyLocale('en');

    expect(document.documentElement.lang).toBe('en');
  });
});
