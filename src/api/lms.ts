import type { Lesson, Module } from '@/types/lms';
import type { PaginantedCollection } from '@/types/api-utility';
import axios from '@/axios';

export const getLessons = async ({ moduleId }: { moduleId?: number } = {}) => {
  const url = new URL(`/api/v2/lms/lessons/`, window.location.origin);
  moduleId && url.searchParams.set('module', moduleId.toString());

  return (
    (await axios.get(url.toString())).data as PaginantedCollection<Lesson>
  ).results;
};

export const getModules = async ({ courseId }: { courseId?: number } = {}) => {
  const url = new URL(`/api/v2/lms/modules/`, window.location.origin);
  courseId && url.searchParams.set('course', courseId.toString());

  return (
    (await axios.get(url.toString())).data as PaginantedCollection<Module>
  ).results;
};
