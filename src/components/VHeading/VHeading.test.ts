import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VHeading from './VHeading.vue';
import { faker } from '@faker-js/faker';

const defaultProps = {};

describe('VHeading', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHeading>>;

  beforeEach(() => {
    wrapper = mount(VHeading, { shallow: true, props: defaultProps });
  });

  test('element is h2 by default', () => {
    expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
  });

  test('element can be changed using props', () => {
    wrapper = mount(VHeading, { shallow: true, props: { tag: 'h1' } });

    expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
  });

  test('heading has slot', () => {
    const content = faker.finance.accountNumber();

    wrapper = mount(VHeading, {
      shallow: true,
      slots: { default: content },
      props: defaultProps,
    });

    expect(wrapper.text()).toBe(content);
  });
});
