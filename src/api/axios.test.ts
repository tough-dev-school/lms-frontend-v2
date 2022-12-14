import { test, describe } from 'vitest';

describe('custom axios', () => {
  test.todo('response data is converted to CamelCase', () => {});
  test.todo('response data coversion can be disabled', () => {});

  test.todo('request data is converted to snake_case', () => {});
  test.todo('request data coversion can be disabled', () => {});

  test.todo('auth token added to request headers if exist', () => {});
  test.todo(
    'auth token is not added to request headers if not exist',
    () => {},
  );

  test.todo('logout on 401', () => {});
  test.todo('calls handleError with error for json errors', () => {});
  test.todo('calls handleError with error non-json errors', () => {});
});
