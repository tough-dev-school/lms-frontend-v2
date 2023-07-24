import { VTextInput } from '@/components/VTextInput';
import { faker } from '@faker-js/faker';
import { VueWrapper, mount } from '@vue/test-utils';

const defaultProps = {
  error: 'This is a error',
  label: 'This is a label',
  modelValue: '',
  tip: 'This is a tip',
};

describe('VTextInput', () => {
  let wrapper: VueWrapper<InstanceType<typeof VTextInput>>;

  beforeEach(() => {
    wrapper = mount(VTextInput, { props: defaultProps, shallow: true });
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
      props: { ...defaultProps, label },
      shallow: true,
    });

    expect(getLabelWrapper().text()).toBe(label);
  });

  test('label can be set by slot', () => {
    const label = faker.finance.accountName();
    wrapper = mount(VTextInput, {
      props: defaultProps,
      shallow: true,
      slots: { label },
    });

    expect(getLabelWrapper().text()).toBe(label);
  });

  test('has correct tip if tip is defined', () => {
    expect(getTipWrapper().text()).toBe(defaultProps.tip);
  });

  test('has no tip if no tip is defined', () => {
    wrapper = mount(VTextInput, {
      props: { ...defaultProps, tip: undefined },
      shallow: true,
    });

    expect(getTipWrapper().exists()).toBe(false);
  });

  test('has correct error if error is defined', () => {
    expect(getErrorWrapper().text()).toBe(defaultProps.error);
  });

  test('has no error if no error is defined', () => {
    wrapper = mount(VTextInput, {
      props: { ...defaultProps, error: undefined },
      shallow: true,
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
