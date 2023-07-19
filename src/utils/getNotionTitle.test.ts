// @ts-nocheck
// #FIXME Remove ts-nocheck
import { faker } from '@faker-js/faker';

import getNotionTitle from './getNotionTitle';

const title = faker.lorem.sentence();
const id = faker.string.uuid();

const example = {
  [id]: {
    role: 'reader',
    value: {
      properties: {
        title: [[title]],
      },
    },
  },
};

describe('getNotionTitle', () => {
  test('return undefined if has no title', () => {
    expect(getNotionTitle(id, {})).toBe(undefined);
    expect(getNotionTitle(id, { [id]: {} })).toBe(undefined);
    expect(getNotionTitle(id, { [id]: { value: {} } })).toBe(undefined);
    expect(getNotionTitle(id, { [id]: { value: { properties: {} } } })).toBe(
      undefined,
    );
  });

  test('return title if has proper title', () => {
    expect(getNotionTitle(id, example)).toBe(title);
  });
});
