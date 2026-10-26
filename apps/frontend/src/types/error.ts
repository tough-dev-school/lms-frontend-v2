// Field name to message(s). Server errors come from Inertia's form.errors, client checks use the same shape.
export type FormError = Partial<Record<string, string | string[]>> | null;

export function getErrorData(
  error: FormError | undefined,
): Record<string, string | string[]> {
  if (!error) return {};

  return Object.fromEntries(
    Object.entries(error).filter(
      (entry): entry is [string, string | string[]] => entry[1] !== undefined,
    ),
  );
}

/**
 * Creates a FormError from custom validation messages
 * @param errors - Object with field names as keys and error messages as values
 * @returns FormError that can be displayed by VError component
 */
export function createValidationError(
  errors: Record<string, string | string[]>,
): FormError {
  return errors;
}

/**
 * Merges multiple errors into a single FormError
 * Backend errors take precedence over validation errors for the same field
 */
export function mergeErrors(
  backendError: FormError | undefined,
  validationError: FormError | undefined,
): FormError {
  const mergedData = {
    ...getErrorData(validationError),
    ...getErrorData(backendError),
  };

  if (Object.keys(mergedData).length === 0) {
    return null;
  }

  return mergedData;
}
