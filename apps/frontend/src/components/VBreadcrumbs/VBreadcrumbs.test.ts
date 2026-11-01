import { describe, expect, test } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VBreadcrumbs from './VBreadcrumbs.vue';
import type { Breadcrumb } from './VBreadcrumbs.vue';

const createWrapper = (items: Breadcrumb[]) =>
  mount(VBreadcrumbs, {
    props: { items },
    global: {
      stubs: { RouterLink: RouterLinkStub },
    },
  });

describe('VBreadcrumbs', () => {
  test('shows label and keeps name as accessible name', () => {
    const crumb = { name: faker.lorem.words(3), label: '~', to: '/' };

    const wrapper = createWrapper([crumb]);
    const link = wrapper.find('a');

    expect(link.text()).toBe('~');
    expect(link.attributes('aria-label')).toBe(crumb.name);
  });

  test('shows name without label', () => {
    const crumb = { name: faker.lorem.words(3), to: '/' };

    const wrapper = createWrapper([crumb]);
    const link = wrapper.find('a');

    expect(link.text()).toBe(crumb.name);
    expect(link.attributes('aria-label')).toBeUndefined();
  });
});
