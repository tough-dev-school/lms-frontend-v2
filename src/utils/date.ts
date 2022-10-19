import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const relativeDate = (date: dayjs.ConfigType) => dayjs().to(date);
