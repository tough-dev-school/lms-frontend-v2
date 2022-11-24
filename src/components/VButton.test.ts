import { describe, test, beforeEach, expect } from 'vitest';
import VButton from '@/components/VButton.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('VButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(VButton, { shallow: true, props: {} });
  });

  test('button visual can be link', () => {
    wrapper = mount(VButton, { shallow: true, props: { tag: 'link' } });

    expect(wrapper.classes('Link')).toBe(true);
  });
});
