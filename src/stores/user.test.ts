import type { Gender } from '@/types/users';

import { getUser, setUser } from '@/api/users';
import useToasts from '@/stores/toasts';
import useUser from '@/stores/user';
import getName from '@/utils/getName';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { createApp } from 'vue';

vi.mock('@/api/users', () => {
  return {
    getUser: vi.fn(),
    setUser: vi.fn(),
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
      firstName: faker.person.firstName(),
      firstNameEn: faker.person.firstName(),
      gender: faker.person.sex(),
      githubUsername: faker.internet.userName(),
      id: faker.string.uuid(),
      lastName: faker.person.lastName(),
      lastNameEn: faker.person.lastName(),
      linkedinUsername: faker.internet.userName(),
      telegramUsername: faker.internet.userName(),
      username: faker.internet.email(),
      uuid: faker.string.uuid(),
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
      firstNameEn,
      gender,
      githubUsername,
      lastName,
      lastNameEn,
      linkedinUsername,
      telegramUsername,
    });

    expect(setUser).toHaveBeenCalledTimes(1);
    expect(setUser).toBeCalledWith({
      firstName,
      firstNameEn,
      gender,
      githubUsername,
      lastName,
      lastNameEn,
      linkedinUsername,
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
});
