import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { VTextInput } from '@/components/VTextInput';
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

  test('label can be set by prop', () => {
    const label = faker.finance.accountName();
    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, label },
    });

    expect(getLabelWrapper().text()).toBe(label);
  });

  test('label can be set by slot', () => {
    const label = faker.finance.accountName();
    wrapper = mount(VTextInput, {
      shallow: true,
      slots: { label },
      props: defaultProps,
    });

    expect(getLabelWrapper().text()).toBe(label);
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
