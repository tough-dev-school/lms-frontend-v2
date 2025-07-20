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

const mockHandleLogin = vi.fn();
const mockMutateAsync = vi.fn();

describe('loginByToken', () => {
  const token = faker.string.uuid();
  const passwordlessToken = faker.string.uuid();
  let mockRoute: RouteLocationNormalized;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockMutateAsync.mockResolvedValue({ token });

    mockRoute = {
      params: { passwordlessToken },
    } as unknown as RouteLocationNormalized;

    vi.mocked(useAuth).mockReturnValue({
      handleLogin: mockHandleLogin,
    } as any);

    vi.mocked(useExchangeTokensMutation).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: ref(false),
    } as any);

    vi.mocked(useQueryClient).mockReturnValue({} as any);
  });

  test('successfully exchanges token and returns home route', async () => {
    const result = await loginByToken(mockRoute);

    expect(mockMutateAsync).toHaveBeenCalledWith({ token: passwordlessToken });
    expect(mockHandleLogin).toHaveBeenCalledWith(token);
    expect(result).toEqual({ name: 'home' });
  });

  test('passes correct passwordlessToken to exchange mutation', async () => {
    await loginByToken(mockRoute);

    expect(mockMutateAsync).toHaveBeenCalledWith({ token: passwordlessToken });
  });

  test('calls handleLogin with returned token', async () => {
    await loginByToken(mockRoute);

    expect(mockHandleLogin).toHaveBeenCalledWith(token);
  });
});
