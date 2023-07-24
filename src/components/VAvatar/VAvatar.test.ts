import { VAvatar } from '@/components/VAvatar';
import { faker } from '@faker-js/faker';
import { VueWrapper, mount } from '@vue/test-utils';

const defaultProps = {
  userId: faker.string.uuid(),
};

describe('VAvatar', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(VAvatar, { props: defaultProps, shallow: true });
  });

  test('Has image source', () => {
    expect(wrapper.attributes('src')).toBeDefined();
  });
});
