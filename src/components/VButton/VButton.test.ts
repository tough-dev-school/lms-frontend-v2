import { VButton } from '@/components/VButton';
import { VueWrapper, mount } from '@vue/test-utils';

describe('VButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(VButton, { props: {}, shallow: true });
  });

  test('button visual can be link', () => {
    wrapper = mount(VButton, { props: { appearance: 'link' }, shallow: true });

    expect(wrapper.classes('link')).toBe(true);
  });
});
