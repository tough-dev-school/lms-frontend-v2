import getName from '@/utils/getName';

import { createApp } from 'vue';
import useToasts from '@/stores/toasts';
import useUser from '@/stores/user';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { setUser, getUser, setAvatar } from '@/api/users';
import { faker } from '@faker-js/faker';
import type { Gender } from '@/types/users';
import { vi, describe, beforeEach, expect, test } from 'vitest';

vi.mock('@/api/users', () => {
  return {
    setUser: vi.fn(),
    getUser: vi.fn(),
    setAvatar: vi.fn(),
  };
});

vi.mock('@/utils/getName');

describe('user store', () => {
  let toasts: ReturnType<typeof useToasts>;
  let user: ReturnType<typeof useUser>;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false });
    app.use(pinia);
    setActivePinia(pinia);

    user = useUser();
    toasts = useToasts();
  });

  test('getData calls api', async () => {
    await user.getData();

    expect(getUser).toHaveBeenCalledTimes(1);
  });

  test('getData sets data from api', async () => {
    const data = {
      id: faker.string.uuid(),
      uuid: faker.string.uuid(),
      username: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      firstNameEn: faker.person.firstName(),
      lastNameEn: faker.person.lastName(),
      gender: faker.person.sex(),
      linkedinUsername: faker.internet.userName(),
      githubUsername: faker.internet.userName(),
      telegramUsername: faker.internet.userName(),
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
    expect(user.telegramUsername).toBe(data.telegramUsername);
  });

  test('setData calls api with data', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const firstNameEn = faker.person.firstName();
    const lastNameEn = faker.person.lastName();
    const gender = faker.person.sex() as Gender;
    const linkedinUsername = faker.internet.userName();
    const githubUsername = faker.internet.userName();
    const telegramUsername = faker.internet.userName();

    await user.setData({
      firstName,
      lastName,
      firstNameEn,
      lastNameEn,
      gender,
      linkedinUsername,
      githubUsername,
      telegramUsername,
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
      telegramUsername,
    });
  });

  test('setData calls api only with changed data', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
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

  test('setAvatar calls api with data', async () => {
    await user.setAvatar(null);

    expect(setAvatar).toHaveBeenCalledTimes(1);
    expect(setAvatar).toBeCalledWith(null);
  });
});
