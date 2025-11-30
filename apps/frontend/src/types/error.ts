export interface BackendErrorResponse {
  response: {
    data: Record<string, string | string[]>;
    status: number;
    statusText: string;
  };
  message?: string;
}

export type FormError = Error | BackendErrorResponse | null;

export function isBackendError(error: unknown): error is BackendErrorResponse {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if (!('response' in error)) {
    return false;
  }

  const errorWithResponse = error as { response: unknown };

  if (
    typeof errorWithResponse.response !== 'object' ||
    errorWithResponse.response === null
  ) {
    return false;
  }

  const response = errorWithResponse.response as Record<string, unknown>;

  return (
    'data' in response &&
    typeof response.data === 'object' &&
    response.data !== null
  );
}

export function getErrorData(
  error: FormError,
): Record<string, string | string[]> {
  if (!error || !isBackendError(error)) {
    return {};
  }
  return error.response.data;
}

/**
 * Creates a FormError from custom validation messages
 * @param errors - Object with field names as keys and error messages as values
 * @returns FormError that can be displayed by VError component
 */
export function createValidationError(
  errors: Record<string, string | string[]>,
): FormError {
  return {
    response: {
      data: errors,
      status: 400,
      statusText: 'Validation Error',
    },
  } as BackendErrorResponse;
}

/**
 * Merges multiple errors into a single FormError
 * Backend errors take precedence over validation errors for the same field
 */
export function mergeErrors(
  backendError: FormError,
  validationError: FormError,
): FormError {
  const backendData = getErrorData(backendError);
  const validationData = getErrorData(validationError);

  const mergedData = { ...validationData, ...backendData };

  if (Object.keys(mergedData).length === 0) {
    return null;
  }

  return createValidationError(mergedData);
}
