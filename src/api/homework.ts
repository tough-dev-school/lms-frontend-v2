import axios from './axios';
import type { Answer } from '@/types/homework';

export const getQuestion = async (id: string) => {
  const url = `/api/v2/homework/questions/${id}/`;

  return (await axios.get(url)).data;
};

export const getAnswers = async (id: string) => {
  const url = `/api/v2/homework/answers/${id}/`;

  return (await axios.get(url)).data as Answer;
};
