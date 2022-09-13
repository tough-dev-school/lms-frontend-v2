import { shallowMount } from '@vue/test-utils';

import UiButton from '@/components/ui-kit/UiButton.vue';

const SLOT_CONTENT = '<p>test slot text</p>';
const DEFAULT_PROPS = {
  size: 'big',
  colorType: 'primary',
};

describe('UiButton', () => {
  let wrapper;

  const createComponent = ({ propsData, ...rest } = {}) => {
    wrapper = shallowMount(UiButton, {
      propsData: { ...DEFAULT_PROPS, ...propsData },
      stubs: ['router-link'],
      slots: {
        default: SLOT_CONTENT,
      },
      ...rest,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('Shows content in slot', () => {
    createComponent();

    expect(wrapper.html()).toMatch(SLOT_CONTENT);
  });

  it('Render button tag without prop "to"', () => {
    createComponent();

    expect(wrapper.html()).toMatch('<button');
  });

  it('Render router-link when pass prop "to"', () => {
    createComponent({ propsData: { to: '/' } });

    expect(wrapper.html()).toMatch('<router-link');
  });

  it('Click event should emitted by click', async () => {
    const onClick = jest.fn();
    createComponent({ listeners: { click: onClick } });

    wrapper.find('button').trigger('click');

    expect(onClick).toHaveBeenCalled();
  });
});
