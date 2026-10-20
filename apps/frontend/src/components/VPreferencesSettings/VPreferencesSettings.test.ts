import { afterEach, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import VPreferencesSettings from './VPreferencesSettings.vue';
import { useLocale } from '@/composables/useLocale';

describe('VPreferencesSettings', () => {
  const mountWrapper = () => mount(VPreferencesSettings);

  const getLanguageSelect = (wrapper: ReturnType<typeof mountWrapper>) =>
    wrapper.find('[data-testid="language"] select');

  afterEach(() => {
    useLocale().locale.value = 'ru';
    localStorage.clear();
  });

  test('shows the current language', () => {
    useLocale().locale.value = 'en';

    const wrapper = mountWrapper();

    expect(
      (getLanguageSelect(wrapper).element as HTMLSelectElement).value,
    ).toBe('en');
  });

  test('switches the interface to English', async () => {
    const wrapper = mountWrapper();

    await getLanguageSelect(wrapper).setValue('en');

    expect(useLocale().locale.value).toBe('en');
    expect(wrapper.text()).toContain('Language');
  });

  test('shows language names with flags in their own language', async () => {
    const wrapper = mountWrapper();
    useLocale().locale.value = 'en';
    await wrapper.vm.$nextTick();

    const options = getLanguageSelect(wrapper)
      .findAll('option')
      .map((option) => option.text());

    expect(options).toEqual(['🇷🇺 Русский', '🇬🇧 English']);
  });
});
