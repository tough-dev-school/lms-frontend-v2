import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VToast from '@/components/VToast';
import { nanoid } from 'nanoid';

const defaultProps = {
  text: faker.lorem.sentence(),
  id: nanoid(),
  lifetime: 1000,
};

describe('VToast', () => {
  let wrapper: VueWrapper<InstanceType<typeof VToast>>;

  beforeEach(() => {
    wrapper = mount(VToast, { shallow: true, props: defaultProps });
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
