import type { VueWrapper } from '@vue/test-utils';

import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';

import { VHeading } from '.';

const defaultProps = {};

describe('VHeading', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHeading>>;

  beforeEach(() => {
    wrapper = mount(VHeading, { props: defaultProps, shallow: true });
  });

  test('element is h2 by default', () => {
    expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
  });

  test('element can be changed using props', () => {
    wrapper = mount(VHeading, { props: { tag: 'h1' }, shallow: true });

    expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
  });

  test('heading has slot', () => {
    const content = faker.finance.accountNumber();

    wrapper = mount(VHeading, {
      props: defaultProps,
      shallow: true,
      slots: { default: content },
    });

    expect(wrapper.text()).toBe(content);
  });
});
