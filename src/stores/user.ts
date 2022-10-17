import { defineStore } from 'pinia';
import { setUser, getUser } from '@/api/users';
import type { EditableUserData } from '@/api/users';
import { getStudies } from '@/api/studies';
import useToasts from '@/stores/toasts';

export type Gender = 'female' | 'male' | undefined;

interface Study {
  id: number;
  slug: string;
  name: string;
  home_page_slug: string;
}

export interface User {
  id: string;
  uuid: string;
  username: string;
}

export interface UserData {
  first_name: string;
  last_name: string;
  first_name_en: string;
  last_name_en: string;
  gender: Gender;
  linkedin_username: string;
  github_username: string;
  studies: Study[];
}

interface State extends User, UserData {}

const useUser = defineStore('user', {
  state: (): State => {
    return {
      id: '',
      uuid: '',
      username: '',
      first_name: '',
      last_name: '',
      first_name_en: '',
      last_name_en: '',
      gender: undefined,
      linkedin_username: '',
      github_username: '',
      studies: [],
    };
  },
  actions: {
    async getUserStudies() {
      try {
        const response = await getStudies();
        this.studies = response.data.results;
      } catch (err) {}
    },
    async getUserData() {
      try {
        const response = await getUser();

        const {
          id,
          uuid,
          username,
          first_name,
          last_name,
          first_name_en,
          last_name_en,
          gender,
          linkedin_username,
          github_username,
        } = response.data;

        this.id = id;
        this.uuid = uuid;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.first_name_en = first_name_en;
        this.last_name_en = last_name_en;
        this.gender = gender;
        this.linkedin_username = linkedin_username;
        this.github_username = github_username;
      } catch (error: any) {}
    },
    async setUserData({
      first_name,
      last_name,
      first_name_en,
      last_name_en,
      gender,
      linkedin_username,
      github_username,
    }: EditableUserData) {
      try {
        const data: EditableUserData = {};

        if (this.first_name !== first_name) {
          data.first_name = first_name;
        }

        if (this.last_name !== last_name) {
          data.last_name = last_name;
        }

        if (this.first_name_en !== first_name_en) {
          data.first_name_en = first_name_en;
        }

        if (this.last_name_en !== last_name_en) {
          data.last_name_en = last_name_en;
        }

        if (this.gender !== gender) {
          data.gender = gender;
        }

        if (this.linkedin_username !== linkedin_username) {
          data.linkedin_username = linkedin_username;
        }

        if (this.github_username !== github_username) {
          data.github_username = github_username;
        }

        await setUser(data);
        const toasts = useToasts();
        toasts.addMessage('Данные сохранены!', 'success');
      } catch (error: any) {}
    },
  },
});

export default useUser;
