import useToasts from '@/stores/toasts';

export const DEFAULT_ERROR_MESSAGE = 'Ошибка!';

const handleError = (error: any = DEFAULT_ERROR_MESSAGE) => {
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
