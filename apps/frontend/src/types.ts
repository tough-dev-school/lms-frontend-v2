import type { Lesson, ModuleDetail } from '@/api/generated';

// A module with a single lesson links straight to that lesson, so the server sends it along
export type ModuleWithLesson = ModuleDetail & { onlyLesson: Lesson | null };
