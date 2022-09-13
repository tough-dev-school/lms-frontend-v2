import axios from "@/api/backend.js";

export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  actions: {
    async FETCH_USER({ commit }) {
      const response = await axios.get(`/api/v2/users/me/`);

      commit("UPDATE_USER", response.data);
    },
    async UPDATE_BACKEND({ state, commit }) {
      const { user } = state;

      const response = await axios.patch(`/api/v2/users/me/`, user);

      commit("UPDATE_USER", response.data);
    },
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.user = { ...state.user, ...user };
    },
  },
};
