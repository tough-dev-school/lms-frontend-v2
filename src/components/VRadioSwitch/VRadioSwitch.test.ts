import { describe, expect, test } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import VRadioSwitch from './VRadioSwitch.vue';
import { SunFilledIcon, MoonFilledIcon } from 'vue-tabler-icons';

describe('VRadioSwitch', () => {
  const options = [
    { value: 'option1', label: 'Опция 1', icon: SunFilledIcon },
    { value: 'option2', label: 'Опция 2', icon: MoonFilledIcon },
  ];

  test('renders all options', () => {
    const wrapper = shallowMount(VRadioSwitch, {
      props: {
        options,
        modelValue: 'option1',
      },
      global: {
        components: {
          SunFilledIcon,
          MoonFilledIcon,
        },
      },
    });

    const labels = wrapper.findAll('label');
    expect(labels).toHaveLength(2);
    expect(labels[0].text()).toContain('Опция 1');
    expect(labels[1].text()).toContain('Опция 2');
  });

  test('highlights active option', () => {
    const wrapper = shallowMount(VRadioSwitch, {
      props: {
        options,
        modelValue: 'option2',
      },
      global: {
        components: {
          SunFilledIcon,
          MoonFilledIcon,
        },
      },
    });

    const activeLabel = wrapper.find('.RadioSwitch__Button_Active');
    expect(activeLabel.exists()).toBe(true);
    expect(activeLabel.text()).toContain('Опция 2');
  });

  test('emits update:modelValue event on click', async () => {
    const wrapper = shallowMount(VRadioSwitch, {
      props: {
        options,
        modelValue: 'option1',
      },
      global: {
        components: {
          SunFilledIcon,
          MoonFilledIcon,
        },
      },
    });

    await wrapper.findAll('input')[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option2']);
  });
});
