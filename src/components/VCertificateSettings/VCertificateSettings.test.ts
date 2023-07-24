import type { VTextInput } from '@/components/VTextInput';
import type { VueWrapper } from '@vue/test-utils';
import type { VueNode } from '@vue/test-utils/dist/types';

import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';

import { VCertificateSettings } from '.';

const defaultData = {
  firstName: faker.person.firstName(),
  firstNameEn: faker.person.firstName(),
  gender: 'female',
  lastName: faker.person.lastName(),
  lastNameEn: faker.person.lastName(),
};

describe('VCertificateSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificateSettings>>;
  let user: ReturnType<typeof useUser>;

  beforeEach(() => {
    wrapper = mount(VCertificateSettings, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: { ...defaultData },
            },
          }),
        ],
        stubs: {
          VCard: false,
        },
      },
      shallow: true,
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
      firstNameEn,
      gender,
      lastName,
      lastNameEn,
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

    expect(user.setData).toHaveBeenCalledTimes(1);
    expect(user.setData).toHaveBeenCalledWith({
      firstName,
      firstNameEn,
      gender: 'female',
      lastName,
      lastNameEn,
    });
  });
});
