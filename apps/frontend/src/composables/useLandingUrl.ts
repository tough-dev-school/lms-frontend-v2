import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { LANDING_URLS } from '@/constants';
import type { Locale } from '@/i18n';

export const useLandingUrl = () => {
  const { locale } = useI18n();

  return computed(() => LANDING_URLS[locale.value as Locale]);
};
