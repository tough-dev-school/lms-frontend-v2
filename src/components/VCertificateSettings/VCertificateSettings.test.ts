import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificateSettings from './VCertificateSettings.vue';
import type VTextInput from '@/components/VTextInput/VTextInput.vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { faker } from '@faker-js/faker';
import { GenderEnum, type User } from '@/api/generated-api';

const defaultData: Partial<User> = {
  id: faker.number.int(),
  username: faker.internet.userName(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  first_name_en: faker.person.firstName(),
  last_name_en: faker.person.lastName(),
  gender: GenderEnum.Female,
};

describe('VCertificateSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificateSettings>>;
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    queryClient.setQueryData(['base', 'user', 'me'], defaultData);

    wrapper = mount(VCertificateSettings, {
      shallow: true,
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
        stubs: {
          VCard: false,
        },
      },
    });
  });

  const getFirstNameWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="firstName"]');
  const getLastNameWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="lastName"]');
  const getFirstNameEnWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="firstNameEn"]');
  const getLastNameEnWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="lastNameEn"]');
  const getGenderFemaleWrapper = () =>
    wrapper.find('[data-testid="gender-female"]');
  const getSaveWrapper = () => wrapper.find('[data-testid="save"]');

  test('fills fields with actual data on mount', async () => {
    await wrapper.vm.$nextTick();

    expect(getFirstNameWrapper().props().modelValue).toBe(
      defaultData.first_name,
    );
    expect(getLastNameWrapper().props().modelValue).toBe(defaultData.last_name);
    expect(getFirstNameEnWrapper().props().modelValue).toBe(
      defaultData.first_name_en,
    );
    expect(getLastNameEnWrapper().props().modelValue).toBe(
      defaultData.last_name_en,
    );
    expect((getGenderFemaleWrapper().element as HTMLInputElement).checked).toBe(
      true,
    );
  });

  test('sends data on save', async () => {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const first_name_en = faker.person.firstName();
    const last_name_en = faker.person.lastName();

    await wrapper.vm.$nextTick();

    getFirstNameWrapper().vm.$emit('update:modelValue', first_name);
    getLastNameWrapper().vm.$emit('update:modelValue', last_name);
    getFirstNameEnWrapper().vm.$emit('update:modelValue', first_name_en);
    getLastNameEnWrapper().vm.$emit('update:modelValue', last_name_en);
    getGenderFemaleWrapper().trigger('click');

    await getSaveWrapper().trigger('click');

    const mutationData = queryClient.getMutationCache().getAll()[0]
      .state.variables;
    expect(mutationData).toEqual({
      first_name,
      last_name,
      first_name_en,
      last_name_en,
      gender: GenderEnum.Female,
    });
  });
});
