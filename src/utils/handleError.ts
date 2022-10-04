import useToasts from '@/stores/toasts';

const handleError = (error: any) => {
  const toasts = useToasts();

  Object.keys(error.response.data).forEach((key) => {
    error.response.data[key].forEach((error: string) => {
      toasts.addMessage(error);
    });
  });
};

export default handleError;
