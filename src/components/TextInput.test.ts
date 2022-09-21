import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import TextInput from './TextInput.vue';
import { faker } from '@faker-js/faker';

const defaultProps = { tip: 'This is a tip', label: 'This is a label' };

describe('TextInput', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(TextInput, { propsData: defaultProps });
  });

  const getLabelWrapper = () => {
    return wrapper.find('[data-testid="label"]');
  };

  const getTipWrapper = () => {
    return wrapper.find('[data-testid="tip"]');
  };

  const getInputWrapper = () => {
    return wrapper.find('[data-testid="input"]');
  };

  test('has correct label if label is defined', () => {
    expect(getLabelWrapper().text()).toBe(defaultProps.label);
  });

  test('has no label if no label is defined', () => {
    const wrapper = shallowMount(TextInput, {
      propsData: { ...defaultProps, label: undefined },
    });

    expect(getLabelWrapper().exists()).toBeFalsy();
  });

  test('has correct tip if tip is defined', () => {
    expect(getTipWrapper().text()).toBe(defaultProps.tip);
  });

  test('has no tip if no tip is defined', () => {
    const wrapper = shallowMount(TextInput, {
      propsData: { ...defaultProps, tip: undefined },
    });

    expect(getTipWrapper().exists()).toBeFalsy();
  });

  test('emits input event on input', async () => {
    const string = faker.internet.email();
    const input = getInputWrapper();

    (input.element as HTMLInputElement).value = string;
    await input.trigger('input');

    expect(wrapper.emitted()['update:modelValue'][0][0]).toBe(string);
  });
});
