import { type Course } from '@/api/generated-api';
import { faker } from '@faker-js/faker';

export const mockStudy = (payload: Partial<Course> = {}): Course => {
  return {
    cover: faker.image.url(),
    id: faker.number.int(),
    slug: faker.string.sample(),
    name: faker.finance.accountName(),
    home_page_slug: faker.string.uuid(),
    ...payload,
  };
};

export const STATIC_STUDY = {
  id: 32,
  slug: 'popug-4-vip',
  name: 'Асинхронная архитектура (всё включено)',
  homePageSlug: '23fe5823cd0c44e5a56fc7aa2e2439a4',
};
