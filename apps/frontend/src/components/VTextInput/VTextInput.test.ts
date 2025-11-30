import { describe, beforeEach, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VTextInput from '@/components/VTextInput/VTextInput.vue';
import VError from '@/components/VError/VError.vue';
import { faker } from '@faker-js/faker';
import { createValidationError } from '@/types/error';
import type { FormError } from '@/types/error';

const defaultProps = {
  tip: 'This is a tip',
  label: 'This is a label',
  name: 'test_field',
  modelValue: '',
};

describe('VTextInput', () => {
  let wrapper: VueWrapper<InstanceType<typeof VTextInput>>;

  beforeEach(() => {
    wrapper = mount(VTextInput, {
      shallow: true,
      props: defaultProps,
      global: {
        stubs: {
          VError: true,
        },
      },
    });
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

  const getVErrorComponent = () => {
    return wrapper.findComponent(VError);
  };

  test('label can be set by prop', () => {
    const label = faker.finance.accountName();
    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, label },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    expect(getLabelWrapper().text()).toBe(label);
  });

  test('label can be set by slot', () => {
    const label = faker.finance.accountName();
    wrapper = mount(VTextInput, {
      shallow: true,
      slots: { label },
      props: defaultProps,
      global: {
        stubs: {
          VError: true,
        },
      },
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
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    expect(getTipWrapper().exists()).toBe(false);
  });

  test('renders VError component when error is provided', () => {
    const error = createValidationError({
      test_field: 'This is an error',
    });

    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, error },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const errorComponent = getVErrorComponent();
    expect(errorComponent.exists()).toBe(true);
    expect(errorComponent.props('error')).toEqual(error);
    expect(errorComponent.props('whitelist')).toEqual([defaultProps.name]);
  });

  test('does not render VError when no error is provided', () => {
    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, error: undefined },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const errorComponent = getVErrorComponent();
    expect(errorComponent.exists()).toBe(true);
    expect(errorComponent.props('error')).toBeUndefined();
  });

  test('passes correct whitelist to VError based on name prop', () => {
    const fieldName = 'custom_field';
    const error = createValidationError({
      custom_field: 'Custom field error',
    });

    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, name: fieldName, error },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const errorComponent = getVErrorComponent();
    expect(errorComponent.props('whitelist')).toEqual([fieldName]);
  });

  test('adds border-red class when error is present', () => {
    const error = createValidationError({
      test_field: 'Error message',
    });

    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, error },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const input = getInputWrapper();
    expect(input.classes()).toContain('border-red');
  });

  test('does not add border-red class when no error', () => {
    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, error: undefined },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const input = getInputWrapper();
    expect(input.classes()).not.toContain('border-red');
  });

  test('emits input event on input', async () => {
    const string = faker.internet.email();
    const input = getInputWrapper();

    (input.element as HTMLInputElement).value = string;
    await input.trigger('input');

    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[string]]);
  });

  test('handles backend error response format', () => {
    const backendError: FormError = {
      response: {
        data: {
          test_field: 'Backend validation failed',
        },
        status: 400,
        statusText: 'Bad Request',
      },
    };

    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, error: backendError },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const errorComponent = getVErrorComponent();
    expect(errorComponent.exists()).toBe(true);
    expect(errorComponent.props('error')).toEqual(backendError);
  });

  test('handles multiple error messages for the same field', () => {
    const error = createValidationError({
      test_field: ['Error 1', 'Error 2', 'Error 3'],
    });

    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, error },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const errorComponent = getVErrorComponent();
    expect(errorComponent.props('error')).toEqual(error);
  });

  test('required name prop is properly passed', () => {
    const name = 'email_field';

    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, name },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    const errorComponent = getVErrorComponent();
    expect(errorComponent.props('whitelist')).toEqual([name]);
  });

  test('accepts different input types', () => {
    const types: ('text' | 'email' | 'password' | 'number')[] = [
      'text',
      'email',
      'password',
      'number',
    ];

    types.forEach((type) => {
      wrapper = mount(VTextInput, {
        shallow: true,
        props: { ...defaultProps, type },
        global: {
          stubs: {
            VError: true,
          },
        },
      });

      const input = getInputWrapper();
      expect(input.attributes('type')).toBe(type);
    });
  });

  test('shows tip and error together when both are present', () => {
    const error = createValidationError({
      test_field: 'Error message',
    });

    wrapper = mount(VTextInput, {
      shallow: true,
      props: { ...defaultProps, tip: 'Helpful tip', error },
      global: {
        stubs: {
          VError: true,
        },
      },
    });

    expect(getTipWrapper().exists()).toBe(true);
    expect(getVErrorComponent().exists()).toBe(true);
  });
});
