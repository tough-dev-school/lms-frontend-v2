import { afterEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VPreferencesSettings from './VPreferencesSettings.vue';
import { i18n } from '@/i18n';
import { router, setPage } from '@/mocks/inertia';

const mountWrapper = () => mount(VPreferencesSettings);

const getLanguageSelect = (wrapper: ReturnType<typeof mountWrapper>) =>
  wrapper.find('[data-testid="language"] select');

const getThemeOption = (
  wrapper: ReturnType<typeof mountWrapper>,
  theme: string,
) => wrapper.find(`[data-testid="theme"] input[value="${theme}"]`);

const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    // jsdom has no Cookie Store API, expiring the cookie is the only way to drop it
    // eslint-disable-next-line unicorn/no-document-cookie
    if (name) document.cookie = `${name}=; max-age=0; path=/`;
  });
};

describe('VPreferencesSettings', () => {
  afterEach(() => {
    clearCookies();
    document.documentElement.className = '';
  });

  test('shows the current language', () => {
    i18n.global.locale.value = 'en';

    const wrapper = mountWrapper();

    expect(
      (getLanguageSelect(wrapper).element as HTMLSelectElement).value,
    ).toBe('en');
  });

  test('switches the interface to English', async () => {
    const wrapper = mountWrapper();

    await getLanguageSelect(wrapper).setValue('en');

    expect(i18n.global.locale.value).toBe('en');
    expect(wrapper.text()).toContain('Language');
  });

  test('remembers the language in a cookie, so the server renders it next time', async () => {
    const wrapper = mountWrapper();

    await getLanguageSelect(wrapper).setValue('en');

    expect(document.cookie).toContain('locale=en');
  });

  test('reloads the page props, backend texts follow the language', async () => {
    const reload = vi.spyOn(router, 'reload');
    const wrapper = mountWrapper();

    await getLanguageSelect(wrapper).setValue('en');

    expect(reload).toHaveBeenCalled();
  });

  test('shows language names with flags in their own language', async () => {
    const wrapper = mountWrapper();
    i18n.global.locale.value = 'en';
    await wrapper.vm.$nextTick();

    const options = getLanguageSelect(wrapper)
      .findAll('option')
      .map((option) => option.text());

    expect(options).toEqual(['🇷🇺 Русский', '🇬🇧 English']);
  });

  test('shows the theme from the server', () => {
    setPage({ props: { theme: 'dark' } });

    const wrapper = mountWrapper();

    expect(
      getThemeOption(wrapper, 'dark').element.closest('label')?.classList,
    ).toContain('RadioSwitch__Button_Active');
  });

  test('switches to the dark theme and remembers it', async () => {
    const wrapper = mountWrapper();

    await getThemeOption(wrapper, 'dark').trigger('click');

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.cookie).toContain('theme=dark');
  });
});
