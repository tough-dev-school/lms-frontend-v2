import { describe, expect, test, vi, beforeEach } from 'vitest';
import { loginByToken } from './loginByToken';
import type { RouteLocationNormalized } from 'vue-router';
import { faker } from '@faker-js/faker';
import { useAuth } from '@/composables/useAuth';
import { useExchangeTokensMutation } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

vi.mock('@/composables/useAuth');
vi.mock('@/query');
vi.mock('@tanstack/vue-query');

const mockMutateAsync = vi.fn();

describe('loginByToken', () => {
  const tokenValue = faker.string.uuid();
  const passwordlessToken = faker.string.uuid();
  let mockRoute: RouteLocationNormalized;

  beforeEach(async () => {
    mockMutateAsync.mockResolvedValue({ token: tokenValue });

    mockRoute = {
      params: { passwordlessToken },
    } as unknown as RouteLocationNormalized;

    vi.mocked(useAuth).mockReturnValue({
      token: ref(undefined),
    } as any);

    vi.mocked(useExchangeTokensMutation).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: ref(false),
    } as any);

    vi.mocked(useQueryClient).mockReturnValue({} as any);
  });

  test('successfully exchanges token and returns home route', async () => {
    const result = await loginByToken(mockRoute);
    const { token } = useAuth();

    expect(mockMutateAsync).toHaveBeenCalledWith({ token: passwordlessToken });
    expect(result).toEqual({ name: 'home' });

    expect(token.value).toEqual(tokenValue);
  });

  test('passes correct passwordlessToken to exchange mutation', async () => {
    await loginByToken(mockRoute);

    expect(mockMutateAsync).toHaveBeenCalledWith({ token: passwordlessToken });
  });

  test('calls handleLogin with returned token', async () => {
    await loginByToken(mockRoute);

    const { token } = useAuth();

    expect(token.value).toEqual(tokenValue);
  });
});
