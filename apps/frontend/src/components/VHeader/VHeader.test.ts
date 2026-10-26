import { describe, beforeEach, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VHeader from './VHeader.vue';
import { Link } from '@/mocks/inertia';

describe('VHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHeader>>;

  beforeEach(() => {
    wrapper = mount(VHeader, { shallow: true });
  });

  const getLogoWrapper = () => wrapper.findComponent(Link);

  test('has logo that leads to home page', () => {
    expect(getLogoWrapper().exists()).toBe(true);
    expect(getLogoWrapper().props('href')).toBe('/');
  });

  test('renders slot content', () => {
    const slotContent = '<div data-testid="slot-content">Test Slot</div>';
    wrapper = mount(VHeader, {
      shallow: true,
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });
});
