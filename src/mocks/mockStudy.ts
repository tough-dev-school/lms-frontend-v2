import type { Study } from '@/types/studies';

import { faker } from '@faker-js/faker';

export const mockStudy = (payload: Partial<Study> = {}): Study => {
  return {
    cover: faker.image.url(),
    homePageSlug: faker.string.uuid(),
    id: faker.number.int(),
    name: faker.finance.accountName(),
    slug: faker.string.sample(),
    ...payload,
  };
};

export const STATIC_STUDY = {
  homePageSlug: '23fe5823cd0c44e5a56fc7aa2e2439a4',
  id: 32,
  name: 'Асинхронная архитектура (всё включено)',
  slug: 'popug-4-vip',
};
