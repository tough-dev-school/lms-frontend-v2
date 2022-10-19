import { beforeEach, describe, test, expect } from 'vitest';
import Avatar from './Avatar.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

const defaultProps = {
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
};

describe('Avatar', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(Avatar, { props: defaultProps });
  });

  test('Renders two letter avatar', () => {
    const { name, surname } = defaultProps;

    expect(wrapper.text()).toBe(`${name[0]}${surname[0]}`);
  });

  test('Renders one letter avatar if only name defined', () => {
    const props = { name: faker.name.firstName() };
    wrapper = shallowMount(Avatar, { props });

    expect(wrapper.text()).toBe(props.name[0]);
  });

  test('Renders one letter avatar if only surname defined', () => {
    const props = { surname: faker.name.lastName() };
    wrapper = shallowMount(Avatar, { props });

    expect(wrapper.text()).toBe(props.surname[0]);
  });
});
