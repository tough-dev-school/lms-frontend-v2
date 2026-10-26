import { ref, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { Theme } from '@/preferences';
import { THEME_COOKIE, applyTheme, writePreferenceCookie } from '@/preferences';

export const useTheme = () => {
  const page = usePage();
  const theme = ref<Theme>(page.props.theme);

  watch(theme, (value) => {
    applyTheme(value);
    writePreferenceCookie(THEME_COOKIE, value);
  });

  return { theme };
};
