import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import Toast from './Toast.vue';
import { nanoid } from 'nanoid';

const defaultProps = {
  text: faker.lorem.sentence(),
  id: nanoid(),
  lifetime: 1000,
};

describe('Toast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Toast, { props: defaultProps });
  });

  test('displays correct message', () => {
    expect(wrapper.text()).toBe(defaultProps.text);
  });

  test('emits delete with id on click', async () => {
    await wrapper.trigger('click');

    expect(wrapper.emitted()['delete'][0][0]).toBe(defaultProps.id);
  });

  test.todo('emits delete after liftime end');
});
