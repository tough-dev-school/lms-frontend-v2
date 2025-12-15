import { describe, expect, test, vi, beforeEach } from 'vitest';
import { loginById } from './loginById';
import type { RouteLocationNormalized } from 'vue-router';
import { faker } from '@faker-js/faker';
import { useAuth } from '@/composables/useAuth';
import { authAsRetrieve } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

vi.mock('@/composables/useAuth');
vi.mock('@/api/generated', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/generated')>();
  return {
    ...actual,
    authAsRetrieve: vi.fn(),
  };
});
vi.mock('@tanstack/vue-query');
vi.mock('@/utils/useAuth');

describe('loginById', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      token: ref(undefined),
    } as any);

    vi.mocked(useQueryClient).mockReturnValue({
      invalidateQueries: vi.fn(),
    } as any);
  });

  test('successfully logs in user and returns home route', async () => {
    const userId = faker.number.int({ min: 1, max: 1000 });
    const tokenValue = faker.string.uuid();

    vi.mocked(authAsRetrieve).mockResolvedValue({ token: tokenValue } as any);

    const mockRoute = {
      params: { userId: userId.toString() },
    } as unknown as RouteLocationNormalized;

    const result = await loginById(mockRoute);

    const { token } = useAuth();

    expect(authAsRetrieve).toHaveBeenCalledWith(userId);
    expect(token.value).toEqual(tokenValue);
    expect(result).toEqual({ name: 'courses' });
  });

  test('passes correct userId to login mutation', async () => {
    const userId = 42;
    const tokenValue = faker.string.uuid();

    vi.mocked(authAsRetrieve).mockResolvedValue({ token: tokenValue } as any);

    const mockRoute = {
      params: { userId: userId.toString() },
    } as unknown as RouteLocationNormalized;

    await loginById(mockRoute);

    const { token } = useAuth();

    expect(authAsRetrieve).toHaveBeenCalledWith(userId);
    expect(token.value).toEqual(tokenValue);
  });

  test('calls handleLogin with returned token', async () => {
    const userId = faker.number.int({ min: 1, max: 1000 });
    const tokenValue = faker.string.uuid();

    vi.mocked(authAsRetrieve).mockResolvedValue({ token: tokenValue } as any);

    const mockRoute = {
      params: { userId: userId.toString() },
    } as unknown as RouteLocationNormalized;

    await loginById(mockRoute);

    const { token } = useAuth();

    expect(token.value).toEqual(tokenValue);
  });
});
