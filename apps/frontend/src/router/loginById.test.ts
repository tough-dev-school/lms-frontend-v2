import { describe, expect, test, vi, beforeEach } from 'vitest';
import { loginById } from './loginById';
import type { RouteLocationNormalized } from 'vue-router';
import { faker } from '@faker-js/faker';
import { useAuth } from '@/composables/useAuth';
import { useLoginWithUserIdMutation } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

vi.mock('@/composables/useAuth');
vi.mock('@/query');
vi.mock('@tanstack/vue-query');
vi.mock('@/utils/useAuth');

const mockMutateAsync = vi.fn();

describe('loginById', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      token: ref(undefined),
    } as any);

    vi.mocked(useLoginWithUserIdMutation).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: ref(false),
    } as any);

    vi.mocked(useQueryClient).mockReturnValue({} as any);
  });

  test('successfully logs in user and returns home route', async () => {
    const userId = faker.number.int({ min: 1, max: 1000 });
    const tokenValue = faker.string.uuid();

    mockMutateAsync.mockResolvedValue({ token: tokenValue });

    const mockRoute = {
      params: { userId: userId.toString() },
    } as unknown as RouteLocationNormalized;

    const result = await loginById(mockRoute);

    const { token } = useAuth();

    expect(mockMutateAsync).toHaveBeenCalledWith(userId);
    expect(token.value).toEqual(tokenValue);
    expect(result).toEqual({ name: 'courses' });
  });

  test('passes correct userId to login mutation', async () => {
    const userId = 42;
    const tokenValue = faker.string.uuid();

    mockMutateAsync.mockResolvedValue({ token: tokenValue });

    const mockRoute = {
      params: { userId: userId.toString() },
    } as unknown as RouteLocationNormalized;

    await loginById(mockRoute);

    const { token } = useAuth();

    expect(mockMutateAsync).toHaveBeenCalledWith(userId);
    expect(token.value).toEqual(tokenValue);
  });

  test('calls handleLogin with returned token', async () => {
    const userId = faker.number.int({ min: 1, max: 1000 });
    const tokenValue = faker.string.uuid();

    mockMutateAsync.mockResolvedValue({ token: tokenValue });

    const mockRoute = {
      params: { userId: userId.toString() },
    } as unknown as RouteLocationNormalized;

    await loginById(mockRoute);

    const { token } = useAuth();

    expect(token.value).toEqual(tokenValue);
  });
});
