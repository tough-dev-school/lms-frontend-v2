import { defineStore } from 'pinia';
import { setUser, getUser } from '@/api/users';
import useToasts from '@/stores/toasts';
import type { User, EditableUserData } from '@/types/users';
import getName from '@/utils/getName';
import type { Dictionary } from '@/utils/filterDictionary';
import filterDictionary from '@/utils/filterDictionary';

const useUser = defineStore('user', {
  state: (): User => {
    return {
      id: '',
      uuid: '',
      username: '',
      firstName: '',
      lastName: '',
      firstNameEn: '',
      lastNameEn: '',
      gender: undefined,
      linkedinUsername: '',
      githubUsername: '',
    };
  },
  getters: {
    name(state) {
      return getName(state.firstName, state.lastName);
    },
  },
  actions: {
    async getData() {
      try {
        const user = await getUser();

        const {
          id,
          uuid,
          username,
          firstName,
          lastName,
          firstNameEn,
          lastNameEn,
          gender,
          linkedinUsername,
          githubUsername,
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
});

export default useUser;
