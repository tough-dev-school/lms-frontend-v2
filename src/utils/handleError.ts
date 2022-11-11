import useToasts from '@/stores/toasts';

const handleError = (error: any) => {
  const toasts = useToasts();

  Object.keys(error.response.data).forEach((key) => {
    const field = error.response.data[key];
    const fields = Array.isArray(field) ? field : [field];
    fields.forEach((error: string) => {
      toasts.addMessage(error, 'error');
    });
  });
};

export default handleError;
