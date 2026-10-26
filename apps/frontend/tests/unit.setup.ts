import { beforeEach } from 'vitest';
import { config } from '@vue/test-utils';
import { i18n } from '@/i18n';
import { resetPage } from '@/mocks/inertia';

// Components call useI18n(), so every mounted component needs the plugin
config.global.plugins.push(i18n);

// The page mock is shared, props from one test must not leak into the next
beforeEach(() => {
  resetPage();
  i18n.global.locale.value = 'ru';
});
