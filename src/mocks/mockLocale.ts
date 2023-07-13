import { faker } from '@faker-js/faker';

export enum DiplomaLocale {
  RU = 'RU',
  EN = 'EN',
}

const locales = [DiplomaLocale.RU, DiplomaLocale.EN];

export const mockLocale = () => faker.helpers.arrayElement(locales);
