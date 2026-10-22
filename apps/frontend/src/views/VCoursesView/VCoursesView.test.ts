import { vi, describe, beforeEach, afterEach, expect, test } from 'vitest';
import { RouterLinkStub, mount, VueWrapper } from '@vue/test-utils';
import VCoursesView from './VCoursesView.vue';
import type { RouterLink } from 'vue-router';
import { nextTick, ref } from 'vue';
import { faker } from '@faker-js/faker';
import { usePurchasedCoursesList, createCourse } from '@/api/generated';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { i18n } from '@/i18n';

const defaultStudies = faker.helpers.multiple(createCourse, { count: 3 });

vi.mock('@/api/generated', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/generated')>();
  return {
    ...actual,
    usePurchasedCoursesList: vi.fn(),
  };
});

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
        'i18n-t': false,
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
  const getLandingLink = () => {
    return wrapper.find(`[data-testid="landing-link"]`);
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

  describe('landing link', () => {
    afterEach(() => {
      i18n.global.locale.value = 'ru';
    });

    test('leads to tough-dev.school in Russian', () => {
      expect(getLandingLink().attributes('href')).toBe(
        'https://tough-dev.school/?utm_source=lms&utm_campaign=footer',
      );
      expect(getLandingLink().text()).toBe('tough-dev.school');
    });

    test('leads to codenest.school in English', async () => {
      i18n.global.locale.value = 'en';
      await nextTick();

      expect(getLandingLink().attributes('href')).toBe(
        'https://codenest.school/?utm_source=lms&utm_campaign=footer',
      );
      expect(getLandingLink().text()).toBe('codenest.school');
    });
  });
});
