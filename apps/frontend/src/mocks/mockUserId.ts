import { faker } from '@faker-js/faker';

export const mockUserId = (payload?: string): string =>
  payload || faker.string.uuid();

export const USER_1 = '72fd1310-89fa-4756-a88d-d60a60838aac';
export const USER_2 = '996efe59-8c77-40a6-9d0d-528f20c9580f';
export const USER_3 = '9697e414-3dba-4a44-8ea5-c83c0a11dcdf';
