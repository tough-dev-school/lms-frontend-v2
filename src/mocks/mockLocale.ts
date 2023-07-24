import { faker } from '@faker-js/faker';

export enum DiplomaLocale {
  EN = 'EN',
  RU = 'RU',
}

const locales = [DiplomaLocale.RU, DiplomaLocale.EN];

export const mockLocale = () => faker.helpers.arrayElement(locales);
