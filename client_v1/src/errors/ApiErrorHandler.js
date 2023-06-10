const handleRequestResponse = (error) => {
  if (error?.response?.data) {
    return { message: error.response?.data.error };
  }
  return error;
};

const ApiErrorHandler = {
  handleRequestResponse,
};

Object.freeze(ApiErrorHandler);
export default ApiErrorHandler;
