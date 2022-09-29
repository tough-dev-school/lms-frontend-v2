import { defineStore } from 'pinia';
import axios from 'axios';

const toast = (
  message: string,
  type: 'error' | 'success' | 'neutral' = 'neutral',
) => alert(message);

const useAuth = defineStore('auth', {
  state: () => {
    return {
      token: undefined,
    };
  },
  actions: {
    async loginWithCredentials(username: string, password: string) {
      try {
        const response = await axios.post('/api/v2/auth/token/', {
          username,
          password,
        });
        this.token = response.data.token;
      } catch (error: any) {
        const errors = [...error.response.data.non_field_errors];
        errors.forEach((error) => toast(error, 'error'));
      }
    },
  },
});

export default useAuth;
