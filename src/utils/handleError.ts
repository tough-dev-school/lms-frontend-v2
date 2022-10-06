import useToasts from '@/stores/toasts';

const handleError = (error: any) => {
  const toasts = useToasts();

  Object.keys(error.response.data).forEach((key) => {
    const field = error.response.data[key];
    if (Array.isArray(field)) {
      field.forEach((error: string) => {
        toasts.addMessage(error);
      });
    } else {
      toasts.addMessage(field);
    }
  });
};

export default handleError;
