import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCard from './VCard.vue';
import VHeading from '@/components/VHeading/VHeading.vue';
import { faker } from '@faker-js/faker';

const defaultProps = {};

describe('VCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCard>>;

  beforeEach(() => {
    wrapper = mount(VCard, { shallow: true, props: defaultProps });
  });

  test('component is wrapped in a section', () => {
    expect(wrapper.find('section').exists()).toBe(true);
  });

  test('element is div by default', () => {
    expect(wrapper.find('div').exists()).toBe(true);
  });

  test('element can be changed using props', () => {
    const tag = 'article';

    wrapper = mount(VCard, { shallow: true, props: { tag } });

    expect(wrapper.find(tag).exists()).toBe(true);
  });

  test('card has slot', () => {
    const content = faker.finance.accountNumber();

    wrapper = mount(VCard, {
      shallow: true,
      slots: { default: content, footer: '' },
      props: defaultProps,
    });

    expect(wrapper.text()).toContain(content);
  });

  test('renders title when provided', () => {
    const title = faker.lorem.sentence();

    wrapper = mount(VCard, {
      shallow: false,
      props: { title },
    });

    expect(wrapper.findComponent(VHeading).exists()).toBe(true);
    expect(wrapper.findComponent(VHeading).props('tag')).toBe('h2');
    expect(wrapper.findComponent(VHeading).text()).toBe(title);
  });

  test('does not render title when not provided', () => {
    expect(wrapper.findComponent(VHeading).exists()).toBe(false);
  });

  test('renders footer when slot is provided', () => {
    const footerContent = faker.lorem.sentence();

    wrapper = mount(VCard, {
      shallow: true,
      slots: { footer: footerContent },
      props: defaultProps,
    });

    expect(wrapper.find('footer').exists()).toBe(true);
    expect(wrapper.find('footer').text()).toBe(footerContent);
  });

  test('does not render footer when slot is not provided', () => {
    expect(wrapper.find('footer').exists()).toBe(false);
  });
});
