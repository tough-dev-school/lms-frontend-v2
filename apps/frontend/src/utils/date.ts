import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import 'dayjs/locale/ru';
import type { Locale } from '@/i18n';

dayjs.extend(relativeTimePlugin);
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

export type DateFormat = 'date' | 'dayMonth' | 'dateTime' | 'dateTimeSeconds';

// English uses month names, because 02.03 means 2 March in Europe and February 3 in the US
const DATE_FORMATS: Record<Locale, Record<DateFormat, string>> = {
  ru: {
    date: 'DD.MM.YYYY',
    dayMonth: 'DD.MM',
    dateTime: 'DD.MM.YYYY HH:mm',
    dateTimeSeconds: 'DD.MM.YYYY HH:mm:ss',
  },
  en: {
    date: 'D MMM YYYY',
    dayMonth: 'D MMM',
    dateTime: 'D MMM YYYY, HH:mm',
    dateTimeSeconds: 'D MMM YYYY, HH:mm:ss',
  },
};

export interface DateOptions {
  locale: Locale;
  // The server renders in UTC, so local times need the student's zone explicitly
  timezone: string;
}

export const relativeDate = (date: dayjs.ConfigType, { locale }: DateOptions) =>
  dayjs().locale(locale).to(date);

export const formatDate = (
  date: dayjs.ConfigType,
  { locale, timezone }: DateOptions,
  format: DateFormat = 'date',
  localTime = true,
) => {
  const dayjsDate = (
    localTime ? dayjs(date).tz(timezone) : dayjs(date).utc()
  ).locale(locale);
  const formatted = dayjsDate.format(DATE_FORMATS[locale][format]);
  return localTime ? formatted : `${formatted} UTC`;
};

export const isBefore = (a: dayjs.ConfigType, b: dayjs.ConfigType) => {
  return dayjs(a).isBefore(b);
};
