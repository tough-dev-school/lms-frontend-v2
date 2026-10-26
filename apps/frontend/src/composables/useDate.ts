import { computed } from 'vue';
import type dayjs from 'dayjs';
import { usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';
import type { Locale } from '@/i18n';
import type { DateFormat } from '@/utils/date';
import { formatDate, relativeDate } from '@/utils/date';

export const useDate = () => {
  const page = usePage();
  const { locale } = useI18n();

  // Reading the locale ref here makes templates re-render dates when the language changes
  const options = computed(() => ({
    locale: locale.value as Locale,
    timezone: page.props.timezone,
  }));

  return {
    formatDate: (
      date: dayjs.ConfigType,
      format?: DateFormat,
      localTime?: boolean,
    ) => formatDate(date, options.value, format, localTime),
    relativeDate: (date: dayjs.ConfigType) => relativeDate(date, options.value),
  };
};
