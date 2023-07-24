import type { EditableUserData, User } from '@/types/users';
import type { Dictionary } from '@/utils/filterDictionary';

import { getUser, setUser } from '@/api/users';
import useToasts from '@/stores/toasts';
import filterDictionary from '@/utils/filterDictionary';
import getName from '@/utils/getName';
import { defineStore } from 'pinia';

const useUser = defineStore('user', {
  actions: {
    async getData() {
      try {
        const user = await getUser();

        const {
          firstName,
          firstNameEn,
          gender,
          githubUsername,
          id,
          lastName,
          lastNameEn,
          linkedinUsername,
          telegramUsername,
          username,
          uuid,
        } = user;

        this.id = id;
        this.uuid = uuid;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.firstNameEn = firstNameEn;
        this.lastNameEn = lastNameEn;
        this.gender = gender;
        this.linkedinUsername = linkedinUsername;
        this.githubUsername = githubUsername;
        this.telegramUsername = telegramUsername;
      } catch (error: any) {}
    },
    async setData(updates: EditableUserData) {
      try {
        const data = filterDictionary(updates, (value, key) => {
          return (this as Dictionary<any>)[key] !== value;
        });

        await setUser(data);

        const toasts = useToasts();
        toasts.addMessage('Данные сохранены!', 'success');

        await this.getData();
      } catch (error: any) {}
    },
  },
  getters: {
    name(state) {
      return getName(state.firstName, state.lastName);
    },
  },
  state: (): User => {
    return {
      firstName: '',
      firstNameEn: '',
      gender: undefined,
      githubUsername: '',
      id: '',
      lastName: '',
      lastNameEn: '',
      linkedinUsername: '',
      telegramUsername: '',
      username: '',
      uuid: '',
    };
  },
});

export default useUser;
