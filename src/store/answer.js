import axios from '@/api/backend.js';
import Vue from 'vue';

export default {
  namespaced: true,
  state: () => ({
    question: null,
    answer: null,
    answerWaitingForAPI: null,
  }),
  actions: {
    async FETCH_ANSWER({ dispatch, commit }, { id }) {
      const result = await axios.get(`/api/v2/homework/answers/${id}/`);
      const { question } = result.data;
      commit('SET_ANSWER', result.data);
      return dispatch('FETCH_QUESTION', { id: question });
    },
    async FETCH_QUESTION({ commit }, { id }) {
      const response = await axios.get(`/api/v2/homework/questions/${id}/`);

      commit('SET_QUESTION', response.data);
    },
    async POST_ANSWER({ dispatch, state }, answer) {
      await axios.post('/api/v2/homework/answers/', answer);
      await dispatch('FETCH_ANSWER', { id: state.answer.slug });
    },
    async UPDATE_ANSWER({ commit }, answer) {
      commit('SET_ANSWER_WAITING_FOR_API', answer);
      const { slug, text } = answer;
      const response = await axios.patch(`/api/v2/homework/answers/${slug}/`, { text });
      commit('UPDATE_ANSWER', response.data);
      commit('SET_ANSWER_WAITING_FOR_API', null);
    },
    async DELETE_ANSWER({ commit }, answer) {
      commit('SET_ANSWER_WAITING_FOR_API', answer);
      const { slug } = answer;
      await axios.delete(`/api/v2/homework/answers/${slug}/`);
      commit('SET_ANSWER_WAITING_FOR_API', null);
    },
  },
  mutations: {
    SET_ANSWER_WAITING_FOR_API(state, answer) {
      state.answerWaitingForAPI = answer;
    },
    SET_ANSWER(state, answer) {
      state.answer = answer;
    },
    SET_QUESTION(state, question) {
      state.question = question;
    },
    UPDATE_ANSWER(state, updated) {
      if (!state.answer) {
        return;
      }
      state.answer.descendants.forEach((descendant, i) => {
        if (descendant.slug == updated.slug) {
          Vue.set(state.answer.descendants, i, updated);
        }
      });
    },
    DELETE_ANSWER(state, { slug }) {
      if (!state.answer) {
        return;
      }
      state.answer.descendants.forEach((descendant, i) => {
        if (descendant.slug == slug) {
          state.answer.descendants.splice(i, 1);
        }
      });
    },
  },
};
