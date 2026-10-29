import { describe, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import { faker } from '@faker-js/faker';
import VBreadcrumbs from './VBreadcrumbs.vue';
import type { Breadcrumb } from './VBreadcrumbs.vue';

const createModuleCrumb = (moduleId: number): Breadcrumb => ({
  name: faker.lorem.words(3),
  to: { name: 'module', params: { moduleId } },
});

const createWrapper = (items: Breadcrumb[]) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/modules/:moduleId', name: 'module', component: {} }],
  });
  const push = vi.spyOn(router, 'push').mockResolvedValue(undefined);

  const wrapper = mount(VBreadcrumbs, {
    props: { items },
    global: {
      plugins: [router],
      stubs: { RouterLink: RouterLinkStub },
    },
  });

  return { wrapper, push };
};

const getSelect = (wrapper: VueWrapper) => wrapper.find('select');
const getOptionLabels = (wrapper: VueWrapper) =>
  wrapper.findAll('option').map((option) => option.text());

describe('VBreadcrumbs', () => {
  test('shows label and keeps name as accessible name', () => {
    const crumb = { ...createModuleCrumb(1), label: '~' };

    const { wrapper } = createWrapper([crumb]);
    const link = wrapper.find('a');

    expect(link.text()).toBe('~');
    expect(link.attributes('aria-label')).toBe(crumb.name);
  });

  test('shows siblings in a select with the current page selected', () => {
    const siblings = [createModuleCrumb(1), createModuleCrumb(2)];
    const current = { ...siblings[1], siblings };

    const { wrapper } = createWrapper([current]);

    expect(getOptionLabels(wrapper)).toEqual(siblings.map((s) => s.name));
    expect(getSelect(wrapper).element.value).toBe('/modules/2');
  });

  test('navigates to the picked sibling', async () => {
    const siblings = [createModuleCrumb(1), createModuleCrumb(2)];
    const current = { ...siblings[1], siblings };
    const { wrapper, push } = createWrapper([current]);

    await getSelect(wrapper).setValue('/modules/1');

    expect(push).toHaveBeenCalledWith('/modules/1');
  });

  test('has no select without siblings', () => {
    const { wrapper } = createWrapper([createModuleCrumb(1)]);

    expect(getSelect(wrapper).exists()).toBe(false);
  });

  test('has no select when the page is its only sibling', () => {
    const crumb = createModuleCrumb(1);

    const { wrapper } = createWrapper([{ ...crumb, siblings: [crumb] }]);

    expect(getSelect(wrapper).exists()).toBe(false);
  });

  test('has no select when the current page is missing from siblings', () => {
    const siblings = [createModuleCrumb(1), createModuleCrumb(2)];

    const { wrapper } = createWrapper([{ ...createModuleCrumb(3), siblings }]);

    expect(getSelect(wrapper).exists()).toBe(false);
  });
});
