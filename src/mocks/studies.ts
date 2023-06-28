// #FIXME Split into separate modules
import { faker } from '@faker-js/faker';

const generateStudy = () => {
  return {
    id: faker.number.int(),
    slug: faker.datatype.string(),
    name: faker.finance.accountName(),
    homePageSlug: faker.string.uuid(),
  };
};

const staticStudy = {
  id: 32,
  slug: 'popug-4-vip',
  name: 'Асинхронная архитектура (всё включено)',
  homePageSlug: '23fe5823cd0c44e5a56fc7aa2e2439a4',
};

export const getStudiesData = (n = 1, isStatic = false) => {
  return [...Array(n)].map(() => (isStatic ? staticStudy : generateStudy()));
};
