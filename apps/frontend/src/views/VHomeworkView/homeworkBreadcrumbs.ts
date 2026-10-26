import type { QuestionDetail } from '@/api/generated';
import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import { urls } from '@/urls';

// Questions outside a course module have no path to show
export const getHomeworkBreadcrumbs = (
  question: QuestionDetail,
  coursesTitle: string,
): Breadcrumb[] | undefined => {
  const { course, module } = question.breadcrumbs;

  if (!course || !module) return undefined;

  return [
    { name: coursesTitle, href: urls.courses() },
    { name: course.name, href: urls.course(course.id) },
    { name: module.name, href: urls.module(course.id, module.id) },
    { name: question.name, href: urls.homework(question.slug) },
  ];
};
