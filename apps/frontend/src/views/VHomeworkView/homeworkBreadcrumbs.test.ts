import { describe, expect, test } from 'vitest';
import { QUESTION_DETAIL } from '@/mocks/homework';
import { getHomeworkBreadcrumbs } from './homeworkBreadcrumbs';

describe('getHomeworkBreadcrumbs', () => {
  test('leads from the course list down to the question', () => {
    const { course, module } = QUESTION_DETAIL.breadcrumbs;

    expect(getHomeworkBreadcrumbs(QUESTION_DETAIL, 'My courses')).toEqual([
      { name: 'My courses', href: '/courses' },
      { name: course.name, href: `/courses/${course.id}` },
      { name: module.name, href: `/courses/${course.id}/modules/${module.id}` },
      { name: QUESTION_DETAIL.name, href: `/homework/${QUESTION_DETAIL.slug}` },
    ]);
  });

  test('is empty for a question outside a module', () => {
    const question = {
      ...QUESTION_DETAIL,
      breadcrumbs: { ...QUESTION_DETAIL.breadcrumbs, module: null },
    };

    // @ts-expect-error the generated type says a module is always there, the API disagrees
    expect(getHomeworkBreadcrumbs(question, 'My courses')).toBeUndefined();
  });
});
