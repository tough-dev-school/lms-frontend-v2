import axios from './axios';
import type { Answer, Question, Post } from '@/types/homework';

export const getQuestion = async (id: string) => {
  const url = `/api/v2/homework/questions/${id}/`;

  return (await axios.get(url)).data as Question;
};

export const getAnswers = async (id: string) => {
  const url = `/api/v2/homework/answers/${id}/`;

  return (await axios.get(url)).data as Answer;
};

export const postAnswer = async ({ text, parent, question }: Post) => {
  const url = '/api/v2/homework/answers/';

  return (await axios.post(url, { text, parent, question })).data;
};
