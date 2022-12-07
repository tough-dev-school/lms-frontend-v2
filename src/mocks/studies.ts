import { faker } from '@faker-js/faker';

export const getStudiesData = (n = 1) => {
  return [...Array(n)].map(() => {
    return {
      id: faker.datatype.number(),
      slug: faker.datatype.string(),
      name: faker.finance.accountName(),
      homePageSlug: faker.datatype.uuid(),
    };
  });
};
