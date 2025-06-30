import useToasts from '@/stores/toasts';

export const DEFAULT_ERROR_MESSAGE = 'Ошибка!';

const handleError = (error: any = DEFAULT_ERROR_MESSAGE) => {
  const { addMessage } = useToasts();

  if (typeof error === 'string') {
    addMessage(error, 'error');
  } else {
    Object.keys(error.response.data).forEach((key) => {
      const field = error.response.data[key];
      const fields = Array.isArray(field) ? field : [field];
      fields.forEach((error: string) => {
        addMessage(error, 'error');
      });
    });
  }
};

export default handleError;
