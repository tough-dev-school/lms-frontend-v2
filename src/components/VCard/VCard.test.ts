import { describe, expect, test, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { VCard } from '.';
import { faker } from '@faker-js/faker';

const defaultProps = {};

describe('VCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCard>>;

  beforeEach(() => {
    wrapper = mount(VCard, { shallow: true, props: defaultProps });
  });

  test('element is div by default', () => {
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  test('element can be changed using props', () => {
    const tag = 'article';

    wrapper = mount(VCard, { shallow: true, props: { tag } });

    expect(wrapper.element.tagName.toLowerCase()).toBe(tag);
  });

  test('card has slot', () => {
    const content = faker.finance.accountNumber();

    wrapper = mount(VCard, {
      shallow: true,
      slots: { default: content, footer: '' },
      props: defaultProps,
    });

    expect(wrapper.text()).toBe(content);
  });
});
