import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import VMaterialView from './VMaterialView.vue';
import { mockNotionMaterial } from '@/mocks/mockNotionMaterial';
import { BREADCRUMBS, MATERIAL } from '@/mocks/courses';
import { setPage } from '@/mocks/inertia';
import { STAFF, STUDENT } from '@/mocks/users';
import { SUPPORT_EMAIL } from '@/constants';
import { urls } from '@/urls';

const MATERIAL_DATA = {
  breadcrumbs: BREADCRUMBS,
  content: mockNotionMaterial(),
};

const mountWrapper = (
  props: Partial<InstanceType<typeof VMaterialView>['$props']> = {},
) =>
  mount(VMaterialView, {
    props: {
      materialId: MATERIAL.id,
      material: MATERIAL_DATA,
      materialStatus: null,
      ...props,
    },
    global: {
      stubs: { NotionRenderer: true, VMaterialAdminTools: true },
    },
  });

describe('VMaterialView', () => {
  test('explains a missing material and links to support', () => {
    const wrapper = mountWrapper({ material: null });

    expect(wrapper.text()).toContain(SUPPORT_EMAIL);
  });

  test('links back to the lesson module', () => {
    const wrapper = mountWrapper();

    const { course, module } = BREADCRUMBS;
    expect(
      wrapper
        .find(`footer a[href="${urls.module(course!.id, module!.id)}"]`)
        .exists(),
    ).toBe(true);
  });

  test('shows the update panel to staff', () => {
    setPage({ props: { user: STAFF } });

    const wrapper = mountWrapper();

    expect(
      wrapper.findComponent({ name: 'VMaterialAdminTools' }).exists(),
    ).toBe(true);
  });

  test('hides the update panel from students', () => {
    setPage({ props: { user: STUDENT } });

    const wrapper = mountWrapper();

    expect(
      wrapper.findComponent({ name: 'VMaterialAdminTools' }).exists(),
    ).toBe(false);
  });
});
