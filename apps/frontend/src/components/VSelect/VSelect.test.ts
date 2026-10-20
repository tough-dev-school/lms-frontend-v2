import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VSelect from '@/components/VSelect/VSelect.vue';
import VError from '@/components/VError/VError.vue';
import { createValidationError } from '@/types/error';

const options = [
  { value: 'ru', label: '🇷🇺 Русский' },
  { value: 'en', label: '🇬🇧 English' },
];

const defaultProps = {
  options,
  name: 'language',
  label: 'Language',
  tip: 'This is a tip',
  modelValue: 'ru',
};

describe('VSelect', () => {
  const mountWrapper = (
    props: Partial<typeof defaultProps> & Record<string, unknown> = {},
    slots: Record<string, string> = {},
  ) =>
    mount(VSelect, {
      props: { ...defaultProps, ...props },
      slots,
      global: { stubs: { VError: true } },
    });

  const getSelect = (wrapper: ReturnType<typeof mountWrapper>) =>
    wrapper.find('[data-testid="select"]');
  const getLabel = (wrapper: ReturnType<typeof mountWrapper>) =>
    wrapper.find('[data-testid="label"]');
  const getTip = (wrapper: ReturnType<typeof mountWrapper>) =>
    wrapper.find('[data-testid="tip"]');

  test('renders an option for each item', () => {
    const wrapper = mountWrapper();

    const labels = getSelect(wrapper)
      .findAll('option')
      .map((option) => option.text());

    expect(labels).toEqual(['🇷🇺 Русский', '🇬🇧 English']);
  });

  test('shows the selected value', () => {
    const wrapper = mountWrapper({ modelValue: 'en' });

    expect((getSelect(wrapper).element as HTMLSelectElement).value).toBe('en');
  });

  test('emits the picked value', async () => {
    const wrapper = mountWrapper();

    await getSelect(wrapper).setValue('en');

    expect(wrapper.emitted('update:modelValue')).toEqual([['en']]);
  });

  test('passes name to the select', () => {
    const name = faker.lorem.word();

    const wrapper = mountWrapper({ name });

    expect(getSelect(wrapper).attributes('name')).toBe(name);
  });

  test('label can be set by prop', () => {
    const label = faker.lorem.words(2);

    const wrapper = mountWrapper({ label });

    expect(getLabel(wrapper).text()).toBe(label);
  });

  test('label can be set by slot', () => {
    const label = faker.lorem.words(2);

    const wrapper = mountWrapper({ label: undefined }, { label });

    expect(getLabel(wrapper).text()).toBe(label);
  });

  test('has no label if none is given', () => {
    const wrapper = mountWrapper({ label: undefined });

    expect(getLabel(wrapper).exists()).toBe(false);
  });

  test('shows a tip', () => {
    const wrapper = mountWrapper();

    expect(getTip(wrapper).text()).toBe(defaultProps.tip);
  });

  test('has no tip if none is given', () => {
    const wrapper = mountWrapper({ tip: undefined });

    expect(getTip(wrapper).exists()).toBe(false);
  });

  test('passes an error for its field to VError', () => {
    const error = createValidationError({ language: 'This is an error' });

    const wrapper = mountWrapper({ error });

    expect(wrapper.findComponent(VError).props()).toMatchObject({
      error,
      whitelist: [defaultProps.name],
    });
  });

  test('highlights the select on error', () => {
    const wrapper = mountWrapper({
      error: createValidationError({ language: 'This is an error' }),
    });

    expect(getSelect(wrapper).classes()).toContain('border-red');
    expect(getSelect(wrapper).classes()).not.toContain('border-white');
  });
});
