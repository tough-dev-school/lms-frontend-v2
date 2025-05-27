import { describe, beforeEach, expect, test } from 'vitest';
import VPill from '@/components/VPill/VPill.vue';
import { mount, VueWrapper } from '@vue/test-utils';

const createItems = () => [
  { label: 'Item 1' },
  { label: 'Item 2', to: '/path' },
];

describe('VPill', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(VPill, {
      props: {
        items: createItems(),
      },
    });
  });

  const getPillItems = () => wrapper.findAll('[data-testid="pill-item"]');

  test('renders correct number of items', () => {
    const items = getPillItems();
    expect(items.length).toBe(2);
  });

  test('renders items with correct labels', () => {
    const items = getPillItems();
    expect(items[0].text()).toBe('Item 1');
    expect(items[1].text()).toBe('Item 2');
  });

  test('renders div for items without links', () => {
    wrapper = mount(VPill, {
      props: {
        items: [{ label: 'Item 1' }],
      },
    });

    const component = getPillItems()[0];
    expect(component.element.tagName).toBe('DIV');
  });

  test('renders anchor tag for items with links', () => {
    wrapper = mount(VPill, {
      props: {
        items: [{ label: 'Item 1', to: '/path' }],
      },
    });

    const component = getPillItems()[0];
    expect(component.element.tagName).toBe('A');
    expect(component.attributes('href')).toBe('/path');
  });
});
