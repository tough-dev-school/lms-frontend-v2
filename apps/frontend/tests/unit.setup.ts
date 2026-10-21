import { config } from '@vue/test-utils';
import { i18n } from '@/i18n';

// Components call useI18n(), so every mounted component needs the plugin
config.global.plugins.push(i18n);
