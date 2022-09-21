import { beforeEach, describe, test, expect } from 'vitest';
import Avatar from './Avatar.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';

const defaultProps = { name: 'John', surname: 'Doe' };

describe('Avatar', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(Avatar, { propsData: defaultProps });
  });

  test('Renders two letter avatar', () => {
    expect(wrapper.text()).toBe('JD');
  });

  test.each([{ name: 'John' }, { surname: 'Doe' }])(
    'Renders one letter avatar',
    (props) => {
      wrapper = shallowMount(Avatar, { propsData: props });
      if (props.name) expect(wrapper.text()).toBe(props.name[0]);
      if (props.surname) expect(wrapper.text()).toBe(props.surname[0]);
    },
  );
});
