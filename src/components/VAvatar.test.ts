import { beforeEach, describe, test, expect } from 'vitest';
import VAvatar from '@/components/VAvatar.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

const defaultProps = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};

describe('VAvatar', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(VAvatar, { props: defaultProps });
  });

  test('Renders two letter avatar', () => {
    const { firstName, lastName } = defaultProps;

    expect(wrapper.text()).toBe(`${firstName[0]}${lastName[0]}`);
  });

  test('Renders one letter avatar if only name defined', () => {
    const props = { firstName: faker.name.firstName() };
    wrapper = shallowMount(VAvatar, { props });

    expect(wrapper.text()).toBe(props.firstName[0]);
  });

  test('Renders one letter avatar if only surname defined', () => {
    const props = { lastName: faker.name.lastName() };
    wrapper = shallowMount(VAvatar, { props });

    expect(wrapper.text()).toBe(props.lastName[0]);
  });
});
