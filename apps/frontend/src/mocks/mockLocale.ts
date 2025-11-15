import { faker } from '@faker-js/faker';
import { LanguageEnum } from '@/api/generated/generated-api';

export const mockLocale = () =>
  faker.helpers.arrayElement(Object.values(LanguageEnum));
