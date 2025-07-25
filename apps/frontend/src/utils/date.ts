import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export const relativeDate = (date: dayjs.ConfigType) => {
  return dayjs().to(date);
};

export const formatDate = (
  date: dayjs.ConfigType,
  format = 'DD.MM.YYYY',
) => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
};
