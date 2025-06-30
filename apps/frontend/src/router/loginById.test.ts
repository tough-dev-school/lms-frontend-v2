import { faker } from '@faker-js/faker';
import { describe, beforeEach, expect, test, vi } from 'vitest';
import { loginById } from './loginById';
import { useAuth } from '@/stores/auth';
import type { RouteLocationNormalized } from 'vue-router';

const userId = faker.string.uuid();

const to: Partial<RouteLocationNormalized> = {
  params: {
    userId,
  },
};

vi.mock('@/stores/auth');

describe('loginById', () => {
  beforeEach(() => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      loginWithUserId: vi.fn(),
    });
  });

  test('should call loginWithUserId', async () => {
    const { loginWithUserId } = useAuth();

    await loginById(to as RouteLocationNormalized);

    expect(loginWithUserId).toHaveBeenCalled();
    expect(loginWithUserId).toHaveBeenCalledWith(userId);
  });

  test('should return directions to home', async () => {
    expect(await loginById(to as RouteLocationNormalized)).toStrictEqual({
      name: 'home',
    });
  });
});
