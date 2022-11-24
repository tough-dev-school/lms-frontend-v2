import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VTextInput from '@/components/VTextInput.vue';
import { faker } from '@faker-js/faker';

const defaultProps = {
  tip: 'This is a tip',
  label: 'This is a label',
  error: 'This is a error',
  modelValue: '',
};

describe('VTextInput', () => {
  let wrapper: VueWrapper<InstanceType<typeof VTextInput>>;

  beforeEach(() => {
    wrapper = mount(VTextInput, { shallow: true, props: defaultProps });
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
    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, label: undefined },
    });

    expect(getLabelWrapper().exists()).toBe(false);
  });

  test('has correct tip if tip is defined', () => {
    expect(getTipWrapper().text()).toBe(defaultProps.tip);
  });

  test('has no tip if no tip is defined', () => {
    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, tip: undefined },
    });

    expect(getTipWrapper().exists()).toBe(false);
  });

  test('has correct error if error is defined', () => {
    expect(getErrorWrapper().text()).toBe(defaultProps.error);
  });

  test('has no error if no error is defined', () => {
    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, error: undefined },
    });

    expect(getErrorWrapper().exists()).toBe(false);
  });

  test('emits input event on input', async () => {
    const string = faker.internet.email();
    const input = getInputWrapper();

    (input.element as HTMLInputElement).value = string;
    await input.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[string]]);
  });
});
