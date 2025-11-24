import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export const relativeDate = (date: dayjs.ConfigType) => {
  return dayjs().to(date);
};

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} HH:mm`;
export const DATE_TIME_SECONDS_FORMAT = `${DATE_TIME_FORMAT}:ss`;

export const formatDate = (date: dayjs.ConfigType, format = 'DD.MM.YYYY') => {
  return dayjs(date).format(format);
};

export const isBefore = (a: dayjs.ConfigType, b: dayjs.ConfigType) => {
  return dayjs(a).isBefore(b);
};
