import getName from '@/utils/getName';

import { describe, test, vi, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import useToasts from '@/stores/toasts';
import useUser from '@/stores/user';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { setUser, getUser } from '@/api/users';
import { faker } from '@faker-js/faker';
import type { Gender } from '@/types/users';

vi.mock('@/api/users', () => {
  return {
    setUser: vi.fn(),
    getUser: vi.fn(),
  };
});

vi.mock('@/utils/getName');

describe('user store', () => {
  let toasts: ReturnType<typeof useToasts>;
  let user: ReturnType<typeof useUser>;

  const app = createApp({});

  beforeEach(() => {
    const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false });
    app.use(pinia);
    setActivePinia(pinia);

    user = useUser();
    toasts = useToasts();
  });

  test('getData calls api', async () => {
    await user.getData();

    expect(getUser).toHaveBeenCalledOnce();
  });

  test('getData sets data from api', async () => {
    const data = {
      id: faker.datatype.uuid(),
      uuid: faker.datatype.uuid(),
      username: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      firstNameEn: faker.name.firstName(),
      lastNameEn: faker.name.lastName(),
      gender: faker.name.sex(),
      linkedinUsername: faker.internet.userName(),
      githubUsername: faker.internet.userName(),
    };
    (getUser as ReturnType<typeof vi.fn>).mockResolvedValue(data);

    await user.getData();

    expect(user.id).toBe(data.id);
    expect(user.uuid).toBe(data.uuid);
    expect(user.username).toBe(data.username);
    expect(user.firstName).toBe(data.firstName);
    expect(user.lastName).toBe(data.lastName);
    expect(user.firstNameEn).toBe(data.firstNameEn);
    expect(user.lastNameEn).toBe(data.lastNameEn);
    expect(user.gender).toBe(data.gender);
    expect(user.linkedinUsername).toBe(data.linkedinUsername);
    expect(user.githubUsername).toBe(data.githubUsername);
  });

  test('setData calls api with data', async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const firstNameEn = faker.name.firstName();
    const lastNameEn = faker.name.lastName();
    const gender = faker.name.sex() as Gender;
    const linkedinUsername = faker.internet.userName();
    const githubUsername = faker.internet.userName();

    await user.setData({
      firstName,
      lastName,
      firstNameEn,
      lastNameEn,
      gender,
      linkedinUsername,
      githubUsername,
    });

    expect(setUser).toHaveBeenCalledTimes(1);
    expect(setUser).toBeCalledWith({
      firstName,
      lastName,
      firstNameEn,
      lastNameEn,
      gender,
      linkedinUsername,
      githubUsername,
    });
  });

  test('setData calls api only with changed data', async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const changedLastName = lastName + 'edit';
    user.$patch({ firstName, lastName });

    await user.setData({ firstName, lastName: changedLastName });

    expect(setUser).toBeCalledWith({ lastName: changedLastName });
  });

  test('setData shows toast on success', async () => {
    await user.setData({});

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
  });

  test('setData does not show toast on failure', async () => {
    (setUser as ReturnType<typeof vi.fn>).mockRejectedValue({});

    await user.setData({});

    expect(toasts.addMessage).toHaveBeenCalledTimes(0); // axios module?
  });

  test('name calls getName', () => {
    user.name;

    expect(getName).toHaveBeenCalledTimes(1);
  });
});
