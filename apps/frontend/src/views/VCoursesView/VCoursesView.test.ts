import { vi, describe, beforeEach, expect, test } from 'vitest';
import { RouterLinkStub, mount, VueWrapper } from '@vue/test-utils';
import VCoursesView from './VCoursesView.vue';
import type { RouterLink } from 'vue-router';
import { nextTick, ref } from 'vue';
import { faker } from '@faker-js/faker';
import { usePurchasedCoursesList, createCourse } from '@/api';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';

const defaultStudies = faker.helpers.multiple(createCourse, { count: 3 });

vi.mock('@/api');

const createWrapper = (studies = defaultStudies) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  vi.mocked(usePurchasedCoursesList).mockReturnValue({
    data: ref({ results: studies }),
    isLoading: ref(false),
  } as any);

  const options: VueQueryPluginOptions = {
    queryClient,
  };

  return mount(VCoursesView, {
    shallow: true,
    global: {
      renderStubDefaultSlot: true,
      plugins: [[VueQueryPlugin, options]],
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });
};

describe('VCoursesView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCoursesView>>;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  const getStudyWrapper = () => {
    return wrapper.findComponent<typeof RouterLink>(`[data-testid="study"]`);
  };
  const getStudiesWrapper = () => {
    return wrapper.findAll(`[data-testid="study"]`);
  };
  const getEmptyWrapper = () => {
    return wrapper.find(`[data-testid="empty"]`);
  };

  test('has correct number of studies', () => {
    expect(getStudiesWrapper()).toHaveLength(defaultStudies.length);
  });

  test('click on studies redirects to material', async () => {
    expect(getStudyWrapper().props().to).toStrictEqual({
      name: 'course',
      params: { courseId: defaultStudies[0].id },
    });
  });

  test('if has studies — empty message is not shown', () => {
    expect(getEmptyWrapper().exists()).toBe(false);
  });

  test('if no studies — empty message is shown', async () => {
    wrapper = createWrapper([]);

    await nextTick();

    expect(getEmptyWrapper().exists()).toBe(true);
  });
});
