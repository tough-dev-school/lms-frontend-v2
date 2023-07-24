import { VToast } from '@/components/VToast';
import { faker } from '@faker-js/faker';
import { VueWrapper, mount } from '@vue/test-utils';
import { nanoid } from 'nanoid';

const defaultProps = {
  id: nanoid(),
  lifetime: 1000,
  text: faker.lorem.sentence(),
};

describe('VToast', () => {
  let wrapper: VueWrapper<InstanceType<typeof VToast>>;

  beforeEach(() => {
    wrapper = mount(VToast, { props: defaultProps, shallow: true });
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
