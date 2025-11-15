import type { Breadcrumbs } from '@/api/generated/types';
import { mockModule } from './mockModule';
import { mockLMSCourse } from './mockLMSCourse';
import { mockLessonPlain } from './mockLessonPlain';

export const mockBreadcrumbs = (): Breadcrumbs => {
  return {
    module: mockModule(),
    course: mockLMSCourse(),
    lesson: mockLessonPlain(),
  };
};
