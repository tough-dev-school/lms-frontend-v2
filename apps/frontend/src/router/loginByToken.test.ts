import { describe, expect, test, vi, beforeEach } from 'vitest';
import { loginByToken } from './loginByToken';
import type { RouteLocationNormalized } from 'vue-router';
import { faker } from '@faker-js/faker';
import { useAuth } from '@/composables/useAuth';
import { authPasswordlessTokenRetrieve } from '@/api';
import { useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

vi.mock('@/composables/useAuth');
vi.mock('@/api');
vi.mock('@tanstack/vue-query');

describe('loginByToken', () => {
  const tokenValue = faker.string.uuid();
  const passwordlessToken = faker.string.uuid();
  let mockRoute: RouteLocationNormalized;

  beforeEach(async () => {
    vi.mocked(authPasswordlessTokenRetrieve).mockResolvedValue({
      token: tokenValue,
    } as any);

    mockRoute = {
      params: { passwordlessToken },
    } as unknown as RouteLocationNormalized;

    vi.mocked(useAuth).mockReturnValue({
      token: ref(undefined),
    } as any);

    vi.mocked(useQueryClient).mockReturnValue({
      invalidateQueries: vi.fn(),
    } as any);
  });

  test('successfully exchanges token and returns home route', async () => {
    const result = await loginByToken(mockRoute);
    const { token } = useAuth();

    expect(authPasswordlessTokenRetrieve).toHaveBeenCalledWith(
      passwordlessToken,
    );
    expect(result).toEqual({ name: 'courses' });

    expect(token.value).toEqual(tokenValue);
  });

  test('passes correct passwordlessToken to exchange mutation', async () => {
    await loginByToken(mockRoute);

    expect(authPasswordlessTokenRetrieve).toHaveBeenCalledWith(
      passwordlessToken,
    );
  });

  test('calls handleLogin with returned token', async () => {
    await loginByToken(mockRoute);

    const { token } = useAuth();

    expect(token.value).toEqual(tokenValue);
  });
});
