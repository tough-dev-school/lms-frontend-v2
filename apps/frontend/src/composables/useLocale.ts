import { computed, watch } from 'vue';
import { createGlobalState, useStorage } from '@vueuse/core';
import dayjs from 'dayjs';
import { i18n, isLocale } from '@/i18n';
import type { Locale } from '@/i18n';

// Russian is the main audience, so anyone with Russian anywhere in their browser languages gets it
export const detectLocale = (): Locale =>
  navigator.languages.some((language) =>
    language.toLowerCase().startsWith('ru'),
  )
    ? 'ru'
    : 'en';

export const applyLocale = (locale: Locale) => {
  i18n.global.locale.value = locale;
  dayjs.locale(locale);
  document.documentElement.lang = locale;
};

export const useLocale = createGlobalState(() => {
  const storedLocale = useStorage<string>('locale', detectLocale());

  const locale = computed<Locale>({
    get: () =>
      isLocale(storedLocale.value) ? storedLocale.value : detectLocale(),
    set: (value) => {
      storedLocale.value = value;
    },
  });

  watch(locale, applyLocale, { immediate: true });

  return { locale };
});
