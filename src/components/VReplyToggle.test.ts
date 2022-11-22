import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import VReplyToggle from './VReplyToggle.vue';

const defaultProps = {
  modelValue: false,
};

describe('VReplyToggle', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReplyToggle>>;

  beforeEach(() => {
    wrapper = shallowMount(VReplyToggle, { props: defaultProps });
  });

  test('emits update:modelValue on click', async () => {
    await wrapper.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeDefined();
  });

  test('when modelValue is true update:modelValue emits false', async () => {
    wrapper = shallowMount(VReplyToggle, { props: { modelValue: false } });

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[true]]);
  });

  test('when modelValue is true update:modelValue emits false', async () => {
    wrapper = shallowMount(VReplyToggle, { props: { modelValue: true } });

    await wrapper.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[false]]);
  });
});
