import { describe, beforeEach, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VCoursesView from './VCoursesView.vue';
import { nextTick } from 'vue';
import { faker } from '@faker-js/faker';
import { createCourse } from '@/api/generated';
import type { Course } from '@/api/generated';
import { i18n } from '@/i18n';
import { Link } from '@/mocks/inertia';

const defaultStudies = faker.helpers.multiple(() => createCourse(), {
  count: 3,
});

const createWrapper = (studies: Course[] = defaultStudies) =>
  mount(VCoursesView, {
    shallow: true,
    props: { studies },
    global: {
      renderStubDefaultSlot: true,
      stubs: {
        'i18n-t': false,
      },
    },
  });

describe('VCoursesView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCoursesView>>;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  const getStudyWrapper = () => {
    return wrapper.findComponent(Link);
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

  test('click on studies leads to the course', () => {
    expect(getStudyWrapper().props('href')).toBe(
      `/courses/${defaultStudies[0].id}`,
    );
  });

  test('if has studies — empty message is not shown', () => {
    expect(getEmptyWrapper().exists()).toBe(false);
  });

  test('if no studies — empty message is shown', () => {
    wrapper = createWrapper([]);

    expect(getEmptyWrapper().exists()).toBe(true);
  });

  describe('landing link', () => {
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
