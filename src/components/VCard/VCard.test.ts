import type { VueWrapper } from '@vue/test-utils';

import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';

import { VCard } from '.';

const defaultProps = {};

describe('VCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCard>>;

  beforeEach(() => {
    wrapper = mount(VCard, { props: defaultProps, shallow: true });
  });

  test('element is div by default', () => {
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  test('element can be changed using props', () => {
    const tag = 'article';

    wrapper = mount(VCard, { props: { tag }, shallow: true });

    expect(wrapper.element.tagName.toLowerCase()).toBe(tag);
  });

  test('card has slot', () => {
    const content = faker.finance.accountNumber();

    wrapper = mount(VCard, {
      props: defaultProps,
      shallow: true,
      slots: { default: content, footer: '' },
    });

    expect(wrapper.text()).toBe(content);
  });
});
