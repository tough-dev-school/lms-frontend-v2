import { computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import type { Locale } from '@/i18n';
import { LOCALE_COOKIE, writePreferenceCookie } from '@/preferences';

export const useLocale = () => {
  const { locale: i18nLocale } = useI18n();

  const locale = computed<Locale>({
    get: () => i18nLocale.value as Locale,
    set: (value) => {
      i18nLocale.value = value;
      document.documentElement.lang = value;
      writePreferenceCookie(LOCALE_COOKIE, value);
      // Backend texts like error messages follow Accept-Language, so the props need a refetch
      router.reload();
    },
  });

  return { locale };
};
