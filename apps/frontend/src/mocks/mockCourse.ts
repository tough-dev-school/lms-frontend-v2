import type { Course } from '@/api/generated/generated-api';
import { faker } from '@faker-js/faker';

export const mockCourse = (payload: Partial<Course> = {}): Required<Course> => {
  return {
    cover: faker.image.url(),
    id: faker.number.int(),
    slug: faker.string.uuid(),
    name: faker.commerce.productName(),
    tariff_name: faker.finance.accountName(),
    product_name: faker.finance.accountName(),
    chat: faker.internet.url(),
    calendar_ios: faker.internet.url(),
    calendar_google: faker.internet.url(),
    home_page_slug: faker.string.uuid(),
    links: [
      {
        name: 'test',
        url: faker.internet.url(),
      },
    ],
    ...payload,
  };
};

export const STATIC_STUDY = {
  id: 32,
  slug: 'popug-4-vip',
  name: 'Асинхронная архитектура (всё включено)',
  homePageSlug: '23fe5823cd0c44e5a56fc7aa2e2439a4',
};
