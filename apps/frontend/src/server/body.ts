import type { Context } from 'hono';

// useForm posts JSON, and switches to multipart when the form holds a file
export const readBody = async (
  c: Context,
): Promise<Record<string, unknown>> => {
  const contentType = c.req.header('Content-Type') ?? '';

  if (contentType.includes('application/json')) {
    return (
      (await c.req.json<Record<string, unknown>>().catch(() => ({}))) ?? {}
    );
  }

  return c.req.parseBody();
};

export const readString = (body: Record<string, unknown>, key: string) => {
  const value = body[key];
  return typeof value === 'string' ? value : '';
};
