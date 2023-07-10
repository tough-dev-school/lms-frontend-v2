import type { Study } from '@/types/studies';
import { faker } from '@faker-js/faker';

export const mockStudy = (payload: Partial<Study> = {}): Study => {
  return {
    cover: faker.image.url(),
    id: faker.number.int(),
    slug: faker.string.sample(),
    name: faker.finance.accountNumberName(),
    homePageSlug: faker.string.uuid(),
    ...payload,
  };
};

export const STATIC_STUDY = {
  id: 32,
  slug: 'popug-4-vip',
  name: 'Асинхронная архитектура (всё включено)',
  homePageSlug: '23fe5823cd0c44e5a56fc7aa2e2439a4',
};
