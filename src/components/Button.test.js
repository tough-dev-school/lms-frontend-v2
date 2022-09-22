import { describe, test, beforeEach, expect } from 'vitest';
import Button from './Button.vue';
import { shallowMount } from '@vue/test-utils';

describe('Button', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Button, { props: {} });
  });

  test('button visual can be link', () => {
    wrapper = shallowMount(Button, { props: { type: 'link' } });

    expect(wrapper.classes('Link')).toBe(true);
  });
});
