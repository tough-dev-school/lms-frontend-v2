import { beforeEach, describe, test, expect } from 'vitest';
import { VAvatar } from '@/components/VAvatar';
import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

const defaultProps = {
  userId: faker.datatype.uuid(),
};

describe('VAvatar', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(VAvatar, { shallow: true, props: defaultProps });
  });

  test('Has image source', () => {
    expect(wrapper.attributes('src')).toBeDefined();
  });
});
