import { describe, test, beforeEach, expect } from 'vitest';
import VButton from '@/components/VButton.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';

describe('VButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(VButton, { props: {} });
  });

  test('button visual can be link', () => {
    wrapper = shallowMount(VButton, { props: { type: 'link' } });

    expect(wrapper.classes('Link')).toBe(true);
  });
});
