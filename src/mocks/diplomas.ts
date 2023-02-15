import { faker } from '@faker-js/faker';
import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import type { Diploma } from '@/types/diplomas';

type locale = 'RU' | 'EN';

const locales: locale[] = ['RU', 'EN'];

const getLocale = () => {
  return locales[faker.datatype.number({ min: 0, max: locales.length - 1 })];
};

const diplomaImage = 'https://loremflickr.com/1480/1048/cats?lock=52395';

export const getDiplomaData = (courseName: string, locale: locale) => {
  return responseCaseMiddleware({
    course: {
      name: courseName,
    },
    slug: faker.datatype.uuid(),
    language: locale,
    image: faker.image.cats(1480, 1048, false),
    student: {
      uuid: faker.datatype.uuid(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    },
    url: faker.internet.url(),
  }) as Diploma;
};

export const getDiplomasData = (length: number = 4) => {
  const diplomas: Diploma[] = [];

  [...Array(length)].forEach(() => {
    const courseName = faker.commerce.productName();
    locales.forEach((locale) => {
      diplomas.push(getDiplomaData(courseName, locale));
    });
  });

  return diplomas;
};
