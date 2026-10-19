import { afterEach, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import VPreferencesSettings from './VPreferencesSettings.vue';
import { useLocale } from '@/composables/useLocale';

describe('VPreferencesSettings', () => {
  const mountWrapper = () => mount(VPreferencesSettings);

  const getLanguageOption = (
    wrapper: ReturnType<typeof mountWrapper>,
    label: string,
  ) =>
    wrapper
      .find('[data-testid="language"]')
      .findAll('label')
      .find((option) => option.text() === label);

  afterEach(() => {
    useLocale().locale.value = 'ru';
    localStorage.clear();
  });

  test('switches the interface to English', async () => {
    const wrapper = mountWrapper();

    await getLanguageOption(wrapper, 'English')?.find('input').trigger('click');

    expect(useLocale().locale.value).toBe('en');
    expect(wrapper.text()).toContain('Language');
  });

  test('shows language names in their own language', async () => {
    const wrapper = mountWrapper();
    useLocale().locale.value = 'en';
    await wrapper.vm.$nextTick();

    expect(getLanguageOption(wrapper, 'Русский')?.exists()).toBe(true);
  });
});
