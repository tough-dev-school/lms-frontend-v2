import { faker } from '@faker-js/faker';
import { LanguageEnum } from '@/api/generated/types';

export const mockLocale = () =>
  faker.helpers.arrayElement(Object.values(LanguageEnum));
