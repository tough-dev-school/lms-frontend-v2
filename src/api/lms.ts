import type { Lessons, Modules } from '@/types/lms';
import axios from '@/axios';

export const getLessons = async () => {
  const url = `/api/v2/lms/lessons/`;

  return (await axios.get(url)).data as Lessons[];
};

export const getModules = async () => {
  const url = `/api/v2/lms/modules/`;

  return (await axios.get(url)).data as Modules[];
};
