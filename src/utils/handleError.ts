import useToasts from '@/stores/toasts';
import { isString } from 'lodash';

const handleError = (error: any) => {
  const toasts = useToasts();

  if (typeof error === 'string') {
    toasts.addMessage(error, 'error');
  } else {
    Object.keys(error.response.data).forEach((key) => {
      const field = error.response.data[key];
      const fields = Array.isArray(field) ? field : [field];
      fields.forEach((error: string) => {
        toasts.addMessage(error, 'error');
      });
    });
  }
};

export default handleError;
