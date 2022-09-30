const toast = (
  message: string,
  type: 'error' | 'success' | 'neutral' = 'neutral',
) => console.log(message);

const handleError = (error: any) => {
  Object.keys(error.response.data).forEach((key) => {
    error.response.data[key].forEach((error: string) => toast(error));
  });
};

export default handleError;
