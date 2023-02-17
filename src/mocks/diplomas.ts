import { faker } from '@faker-js/faker';
import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import type { Diploma } from '@/types/diplomas';
import merge from 'lodash/merge';

type locale = 'RU' | 'EN';

const locales: locale[] = ['RU', 'EN'];

const getLocale = () => {
  return locales[faker.datatype.number({ min: 0, max: locales.length - 1 })];
};

export const getDiplomaData = () => {
  return responseCaseMiddleware({
    course: {
      name: faker.commerce.productName(),
    },
    slug: faker.datatype.uuid(),
    language: getLocale(),
    image: '/diploma-mock.jpg',
    student: {
      uuid: faker.datatype.uuid(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    },
    url: faker.internet.url(),
  }) as Diploma;
};

const getDiplomaSet = (courseName: string, diploma: Diploma) => {
  const diplomas: Diploma[] = [];

  locales.forEach((locale) => {
    diplomas.push(
      merge(
        {},
        diploma,
        { language: locale },
        { course: { name: courseName } },
      ),
    );
  });

  return diplomas;
};

export const getDiplomasData = (
  courses: string[] = [faker.commerce.productName()],
) => {
  const diplomas: Diploma[] = [];

  courses.forEach((courseName) => {
    getDiplomaSet(courseName, getDiplomaData()).forEach((diploma) => {
      diplomas.push(diploma);
    });
  });

  return diplomas;
};

export const diplomasData: Diploma[] = getDiplomasData([
  'Cool course',
  'Amazing course',
  'Pro course',
]);
