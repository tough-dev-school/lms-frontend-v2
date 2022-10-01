import useToasts from '@/stores/toasts';

const toast = (
  message: string,
  type: 'error' | 'success' | 'neutral' = 'neutral',
) => console.log(message);

const handleError = (error: any) => {
  const toasts = useToasts();

  Object.keys(error.response.data).forEach((key) => {
    error.response.data[key].forEach((error: string) => {
      toasts.addMessage(error);
    });
  });
};

export default handleError;
