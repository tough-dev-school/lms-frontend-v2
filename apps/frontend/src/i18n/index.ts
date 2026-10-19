import { createI18n } from 'vue-i18n';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

export type MessageSchema = typeof ru;

export const LOCALES = ['ru', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ru';

export const isLocale = (value: unknown): value is Locale =>
  LOCALES.includes(value as Locale);

const russianPluralRules = new Intl.PluralRules('ru');

// vue-i18n only knows "one | other" by default, Russian needs three forms: `яблоко | яблока | яблок`
// Fractions ("other") take the same form as "few": 1,5 яблока
export const russianPluralRule = (choice: number) =>
  ({ one: 0, few: 1, many: 2, other: 1, zero: 2, two: 1 })[
    russianPluralRules.select(choice)
  ];

export const i18n = createI18n<[MessageSchema], Locale, false>({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: { ru, en },
  pluralRules: { ru: russianPluralRule },
});

declare module 'vue-i18n' {
  // Makes `t()` keys type-checked against ru.json
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends MessageSchema {}
}
