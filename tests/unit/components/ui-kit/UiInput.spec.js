import { shallowMount } from '@vue/test-utils';

import UiInput from '@/components/ui-kit/UiInput.vue';

describe('UiInput', () => {
  let wrapper;

  const findInput = () => wrapper.find('input');

  const createComponent = (options) => {
    wrapper = shallowMount(UiInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('Has valid connection between input and label if we pass native id', () => {
    const INPUT_ID = 'email';
    const propsData = { nativeProps: { id: INPUT_ID } };
    createComponent({ propsData, attachTo: document.body });

    expect(wrapper.html()).toMatch(`for="${INPUT_ID}"`);
    expect(wrapper.html()).toMatch(`id="${INPUT_ID}"`);
  });

  it("Has valid connection between input and label if we don't pass native input id", async () => {
    const PART_OF_DEFAULT_ID = 'input-';
    createComponent({ attachTo: document.body });

    expect(wrapper.html()).toMatch(`for="${PART_OF_DEFAULT_ID}`);
    expect(wrapper.html()).toMatch(`id="${PART_OF_DEFAULT_ID}`);
  });

  it('Has autofocus after mount', () => {
    const propsData = { hasAutofocus: true };
    createComponent({ propsData, attachTo: document.body });
    const input = findInput();

    expect(document.activeElement).toBe(input.element);
  });

  it('Has no autofocus after mount', () => {
    const propsData = { hasAutofocus: false };
    createComponent({ propsData, attachTo: document.body });
    const input = findInput();

    expect(document.activeElement).not.toBe(input.element);
  });
});
