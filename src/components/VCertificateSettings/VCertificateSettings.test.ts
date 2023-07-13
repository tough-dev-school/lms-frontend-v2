import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { VCertificateSettings } from '.';
import type { VTextInput } from '@/components/VTextInput';
import useUser from '@/stores/user';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';
import type { VueNode } from '@vue/test-utils/dist/types';

const defaultData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  firstNameEn: faker.person.firstName(),
  lastNameEn: faker.person.lastName(),
  gender: 'female',
};

describe('VCertificateSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificateSettings>>;
  let user: ReturnType<typeof useUser>;

  beforeEach(() => {
    wrapper = mount(VCertificateSettings, {
      shallow: true,
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              user: { ...defaultData },
            },
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          VCard: false,
        },
      },
    });

    user = useUser();
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

  test('fills fields with actual data on mount', () => {
    expect(getFirstNameWrapper().props().modelValue).toBe(
      defaultData.firstName,
    );
    expect(getLastNameWrapper().props().modelValue).toBe(defaultData.lastName);
    expect(getFirstNameEnWrapper().props().modelValue).toBe(
      defaultData.firstNameEn,
    );
    expect(getLastNameEnWrapper().props().modelValue).toBe(
      defaultData.lastNameEn,
    );
    expect(
      (getGenderFemaleWrapper().element as VueNode<HTMLInputElement>).checked,
    ).toBe(true);
  });

  test('fills fields with actual data on save', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const firstNameEn = faker.person.firstName();
    const lastNameEn = faker.person.lastName();
    const gender = 'female';

    user.$patch({
      firstName,
      lastName,
      firstNameEn,
      lastNameEn,
      gender,
    });

    await getSaveWrapper().trigger('click');

    expect(getFirstNameWrapper().props().modelValue).toBe(firstName);
    expect(getLastNameWrapper().props().modelValue).toBe(lastName);
    expect(getFirstNameEnWrapper().props().modelValue).toBe(firstNameEn);
    expect(getLastNameEnWrapper().props().modelValue).toBe(lastNameEn);
    expect(
      (getGenderFemaleWrapper().element as VueNode<HTMLInputElement>).checked,
    ).toBe(true);
  });

  test('sends data on save', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const firstNameEn = faker.person.firstName();
    const lastNameEn = faker.person.lastName();

    getFirstNameWrapper().vm.$emit('update:modelValue', firstName);
    getLastNameWrapper().vm.$emit('update:modelValue', lastName);
    getFirstNameEnWrapper().vm.$emit('update:modelValue', firstNameEn);
    getLastNameEnWrapper().vm.$emit('update:modelValue', lastNameEn);
    getGenderFemaleWrapper().trigger('click');

    await getSaveWrapper().trigger('click');

    expect(user.setData).toHaveBeenCalledOnce();
    expect(user.setData).toHaveBeenCalledWith({
      firstName,
      lastName,
      firstNameEn,
      lastNameEn,
      gender: 'female',
    });
  });
});
