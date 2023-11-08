import VButton from '@/components/VButton/VButton.vue';
import { mount, VueWrapper } from '@vue/test-utils';

describe('VButton', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(VButton, { shallow: true, props: {} });
  });

  test('button visual can be link', () => {
    wrapper = mount(VButton, { shallow: true, props: { appearance: 'link' } });

    expect(wrapper.classes('link')).toBe(true);
  });
});
