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

  test.each([
    { name: faker.name.firstName() },
    { surname: faker.name.lastName() },
  ])('Renders one letter avatar', (props) => {
    wrapper = shallowMount(Avatar, { props });
    if (props.name) expect(wrapper.text()).toBe(props.name[0]);
    if (props.surname) expect(wrapper.text()).toBe(props.surname[0]);
  });
});
