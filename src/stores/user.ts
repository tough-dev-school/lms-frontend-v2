import { defineStore } from 'pinia';
import axios from '@/axios';

interface EditableUserData {
  first_name?: string;
  last_name?: string;
  first_name_en?: string;
  last_name_en?: string;
  gender?: string;
  linkedin_username?: string;
  github_username?: string;
}

const useUser = defineStore('user', {
  state: () => {
    return {
      id: undefined,
      uuid: undefined,
      username: undefined,
      first_name: undefined,
      last_name: undefined,
      first_name_en: undefined,
      last_name_en: undefined,
      gender: undefined,
      linkedin_username: undefined,
      github_username: undefined,
    };
  },
  actions: {
    async getUserData() {
      try {
        const response = await axios.get('/api/v2/users/me/');

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

        await axios.patch('/api/v2/users/me/', data);
      } catch (error: any) {}
    },
  },
});

export default useUser;
