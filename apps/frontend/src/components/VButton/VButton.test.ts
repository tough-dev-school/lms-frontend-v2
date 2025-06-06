import { describe, beforeEach, expect, test } from 'vitest';
import VButton from '@/components/VButton/VButton.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('VButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(VButton, { shallow: true, props: {} });
  });

  test('button visual can be link', () => {
    wrapper = mount(VButton, { shallow: true, props: { appearance: 'link' } });

    expect(wrapper.classes('Button_Appearance_Link')).toBe(true);
  });

  test('button visual can be primary', () => {
    wrapper = mount(VButton, {
      shallow: true,
      props: { appearance: 'primary' },
    });

    expect(wrapper.classes('Button_Appearance_Primary')).toBe(true);
  });

  test('button visual can be secondary', () => {
    wrapper = mount(VButton, {
      shallow: true,
      props: { appearance: 'secondary' },
    });

    expect(wrapper.classes('Button_Appearance_Secondary')).toBe(true);
  });

  test('button has primary appearance by default', () => {
    wrapper = mount(VButton, { shallow: true });

    expect(wrapper.classes('Button_Appearance_Primary')).toBe(true);
  });

  test('can render as a different tag', () => {
    wrapper = mount(VButton, { shallow: true, props: { tag: 'a' } });

    expect(wrapper.element.tagName).toBe('A');
  });

  test('renders as button tag by default', () => {
    wrapper = mount(VButton, { shallow: true });

    expect(wrapper.element.tagName).toBe('BUTTON');
  });
});
