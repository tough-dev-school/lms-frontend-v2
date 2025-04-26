import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import VHeader from './VHeader.vue';

describe('VHeader', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHeader>>;

  const mountComponent = () => {
    wrapper = mount(VHeader, {
      shallow: true,
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  };

  beforeEach(() => {
    mountComponent();
  });

  const getLogoWrapper = () => wrapper.findComponent(RouterLinkStub);

  test('has logo that leads to home page', () => {
    expect(getLogoWrapper().exists()).toBe(true);
    expect(getLogoWrapper().props().to).toBe('/');
  });

  test('renders slot content', () => {
    const slotContent = '<div data-testid="slot-content">Test Slot</div>';
    wrapper = mount(VHeader, {
      shallow: true,
      slots: {
        default: slotContent,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });
});
