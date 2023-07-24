import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export const relativeDate = (date: dayjs.ConfigType) => {
  return dayjs().to(date);
};

export const formatDate = (date: dayjs.ConfigType, format: string) => {
  return dayjs(date).format(format);
};
