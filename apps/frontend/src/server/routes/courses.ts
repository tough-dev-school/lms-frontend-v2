import { Hono } from 'hono';
import {
  diplomasList,
  lmsLessonsList,
  lmsLessonsRetrieve,
  lmsModulesList,
  lmsModulesRetrieve,
  purchasedCoursesList,
} from '@/api/generated';
import type { ModuleDetail } from '@/api/generated';
import type { ModuleWithLesson } from '@/types';
import type { AppEnv } from '../types';

const listStudies = async () => {
  const { results } = await purchasedCoursesList({ page_size: 100 });
  return results;
};

// A module with a single lesson links straight to that lesson, so the card needs it upfront
const withOnlyLesson = async (
  module: ModuleDetail,
): Promise<ModuleWithLesson> => ({
  ...module,
  onlyLesson:
    module.lesson_count === 1 && module.has_started
      ? await lmsLessonsRetrieve(module.single_lesson_id)
      : null,
});

export const courses = new Hono<AppEnv>()
  .get('/courses', async (c) =>
    c.var.inertia.render('VCoursesView', { studies: await listStudies() }),
  )
  .get('/courses/:courseId', async (c) => {
    const courseId = Number(c.req.param('courseId'));
    const [studies, modules] = await Promise.all([
      listStudies(),
      lmsModulesList({ course: courseId, page_size: 100 }),
    ]);

    return c.var.inertia.render('VCourseView', {
      courseId,
      study: studies.find((study) => study.id === courseId) ?? null,
      modules: await Promise.all(modules.results.map(withOnlyLesson)),
    });
  })
  .get('/courses/:courseId/modules/:moduleId', async (c) => {
    const courseId = Number(c.req.param('courseId'));
    const moduleId = Number(c.req.param('moduleId'));
    const [studies, module, lessons] = await Promise.all([
      listStudies(),
      lmsModulesRetrieve(moduleId),
      lmsLessonsList({ module: moduleId, page_size: 1000 }),
    ]);

    return c.var.inertia.render('VModuleView', {
      courseId,
      courseName: studies.find((study) => study.id === courseId)?.name ?? null,
      module,
      lessons: lessons.results,
    });
  })
  .get('/certificates', async (c) => {
    const { results } = await diplomasList({ page_size: 100 });
    return c.var.inertia.render('VCertificatesView', { diplomas: results });
  });
