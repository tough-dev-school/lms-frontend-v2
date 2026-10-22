import { afterEach, describe, expect, test } from 'vitest';
import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { i18n } from '@/i18n';
import type { Locale } from '@/i18n';
import { useLandingUrl } from './useLandingUrl';

// useI18n only works inside a component setup
const mountLandingUrl = () => {
  let landingUrl!: ReturnType<typeof useLandingUrl>;
  mount(
    defineComponent({
      setup() {
        landingUrl = useLandingUrl();
        return () => null;
      },
    }),
  );
  return landingUrl;
};

const setLocale = (locale: Locale) => {
  i18n.global.locale.value = locale;
};

describe('useLandingUrl', () => {
  afterEach(() => {
    setLocale('ru');
  });

  test('leads Russian speakers to tough-dev.school', () => {
    setLocale('ru');

    const landingUrl = mountLandingUrl();

    expect(landingUrl.value).toBe('https://tough-dev.school');
  });

  test('leads English speakers to codenest.school', () => {
    setLocale('en');

    const landingUrl = mountLandingUrl();

    expect(landingUrl.value).toBe('https://codenest.school');
  });

  test('follows the language switch', async () => {
    setLocale('ru');
    const landingUrl = mountLandingUrl();

    setLocale('en');
    await nextTick();

    expect(landingUrl.value).toBe('https://codenest.school');
  });
});
