import type { Locale } from '@/i18n';

export const SUPPORT_EMAIL = 'support@tough-dev.school';
export const SUPPORT_CHAT_URL = 'tg://resolve?domain=tough_dev_support_bot';
// English-speaking students know the school as Code Nest
export const LANDING_URLS: Record<Locale, string> = {
  ru: 'https://tough-dev.school',
  en: 'https://codenest.school',
};
