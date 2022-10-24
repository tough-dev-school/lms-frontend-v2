import { defineStore } from 'pinia';
import { setUser, getUser } from '@/api/users';
import useToasts from '@/stores/toasts';
import type { User, EditableUserData } from '@/types/users';
import getName from '@/utils/getName';

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
    async setData({
      firstName,
      lastName,
      firstNameEn,
      lastNameEn,
      gender,
      linkedinUsername,
      githubUsername,
    }: EditableUserData) {
      try {
        const data: EditableUserData = {};

        if (this.firstName !== firstName) {
          data.firstName = firstName;
        }

        if (this.lastName !== lastName) {
          data.lastName = lastName;
        }

        if (this.firstNameEn !== firstNameEn) {
          data.firstNameEn = firstNameEn;
        }

        if (this.lastNameEn !== lastNameEn) {
          data.lastNameEn = lastNameEn;
        }

        if (this.gender !== gender) {
          data.gender = gender;
        }

        if (this.linkedinUsername !== linkedinUsername) {
          data.linkedinUsername = linkedinUsername;
        }

        if (this.githubUsername !== githubUsername) {
          data.githubUsername = githubUsername;
        }

        await setUser(data);

        const toasts = useToasts();
        toasts.addMessage('Данные сохранены!', 'success');
      } catch (error: any) {}
    },
  },
});

export default useUser;
