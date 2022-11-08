import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VToast from '@/components/VToast.vue';
import { nanoid } from 'nanoid';

const defaultProps = {
  text: faker.lorem.sentence(),
  id: nanoid(),
  lifetime: 1000,
};

describe('Toast', () => {
  let wrapper: VueWrapper<InstanceType<typeof Toast>>;

  beforeEach(() => {
    wrapper = shallowMount(Toast, { props: defaultProps });
  });

  test('displays correct message', () => {
    expect(wrapper.text()).toBe(defaultProps.text);
  });

  test('emits delete with id on click', async () => {
    await wrapper.trigger('click');

    expect(wrapper.emitted('delete')).toStrictEqual([[defaultProps.id]]);
  });

  test.todo('emits delete after liftime end');
});
