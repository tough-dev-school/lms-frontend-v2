import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import TextInput from './TextInput.vue';
import { faker } from '@faker-js/faker';

const defaultProps = {
  tip: 'This is a tip',
  label: 'This is a label',
  error: 'This is a error',
};

describe('TextInput', () => {
  let wrapper: VueWrapper<InstanceType<typeof TextInput>>;

  beforeEach(() => {
    wrapper = shallowMount(TextInput, { props: defaultProps });
  });

  const getLabelWrapper = () => {
    return wrapper.find('[data-testid="label"]');
  };

  const getTipWrapper = () => {
    return wrapper.find('[data-testid="tip"]');
  };

  const getErrorWrapper = () => {
    return wrapper.find('[data-testid="error"]');
  };

  const getInputWrapper = () => {
    return wrapper.find('[data-testid="input"]');
  };

  test('has correct label if label is defined', () => {
    expect(getLabelWrapper().text()).toBe(defaultProps.label);
  });

  test('has no label if no label is defined', () => {
    wrapper = shallowMount(TextInput, {
      props: { ...defaultProps, label: undefined },
    });

    expect(getLabelWrapper().exists()).toBeFalsy();
  });

  test('has correct tip if tip is defined', () => {
    expect(getTipWrapper().text()).toBe(defaultProps.tip);
  });

  test('has no tip if no tip is defined', () => {
    wrapper = shallowMount(TextInput, {
      props: { ...defaultProps, tip: undefined },
    });

    expect(getTipWrapper().exists()).toBeFalsy();
  });

  test('has correct error if error is defined', () => {
    expect(getErrorWrapper().text()).toBe(defaultProps.error);
  });

  test('has no error if no error is defined', () => {
    wrapper = shallowMount(TextInput, {
      props: { ...defaultProps, error: undefined },
    });

    expect(getErrorWrapper().exists()).toBeFalsy();
  });

  test('emits input event on input', async () => {
    const string = faker.internet.email();
    const input = getInputWrapper();

    (input.element as HTMLInputElement).value = string;
    await input.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[string]]);
  });
});
