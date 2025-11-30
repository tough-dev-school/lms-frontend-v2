import dayjs from 'dayjs';
import relativeTimePlugin from 'dayjs/plugin/relativeTime';
import utcPlugin from 'dayjs/plugin/utc';
import 'dayjs/locale/ru';

dayjs.extend(relativeTimePlugin);
dayjs.extend(utcPlugin);
dayjs.locale('ru');

export const relativeDate = (date: dayjs.ConfigType) => {
  return dayjs().to(date);
};

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} HH:mm`;
export const DATE_TIME_SECONDS_FORMAT = `${DATE_TIME_FORMAT}:ss`;

export const formatDate = (
  date: dayjs.ConfigType,
  format: string = DATE_FORMAT,
  localTime = true,
) => {
  const dayjsDate = localTime ? dayjs(date) : dayjs(date).utc();
  const formatted = dayjsDate.format(format);
  return localTime ? formatted : `${formatted} UTC`;
};

export const isBefore = (a: dayjs.ConfigType, b: dayjs.ConfigType) => {
  return dayjs(a).isBefore(b);
};
