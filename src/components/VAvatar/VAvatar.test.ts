import { describe, beforeEach, expect, test } from 'vitest';
import VAvatar from '@/components/VAvatar/VAvatar.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

const defaultProps = {
  userId: faker.string.uuid(),
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
