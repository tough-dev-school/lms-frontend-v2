import { faker } from '@faker-js/faker';
import { vi, describe, expect, test, beforeEach } from 'vitest';
import { loginByToken } from './loginByToken';
import { useAuth } from '@/stores/auth';
import type { RouteLocationNormalized } from 'vue-router';

vi.mock('@/stores/auth');

const passwordlessToken = faker.string.uuid();

const to: Partial<RouteLocationNormalized> = {
  params: {
    passwordlessToken,
  },
};

describe('loginByToken', () => {
  beforeEach(() => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      exchangeTokens: vi.fn(),
    });
  });

  test('should call exchangeTokens', async () => {
    const { exchangeTokens } = useAuth();

    await loginByToken(to as RouteLocationNormalized);

    expect(exchangeTokens).toHaveBeenCalled();
    expect(exchangeTokens).toHaveBeenCalledWith(passwordlessToken);
  });

  test('should return directions to home', async () => {
    expect(await loginByToken(to as RouteLocationNormalized)).toStrictEqual({
      name: 'home',
    });
  });
});
