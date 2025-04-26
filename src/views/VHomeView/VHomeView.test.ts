import { vi, describe, beforeEach, expect, test } from 'vitest';
import { RouterLinkStub, mount, VueWrapper } from '@vue/test-utils';
import VHomeView from './VHomeView.vue';
import type { RouterLink } from 'vue-router';
import { nextTick, ref } from 'vue';
import { faker } from '@faker-js/faker';
import { mockStudy } from '@/mocks/mockStudy';
import { useStudiesQuery } from '@/query';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';

const defaultStudies = faker.helpers.multiple(mockStudy, { count: 3 });

vi.mock('@/query', () => ({
  useStudiesQuery: vi.fn(),
}));

describe('VHomeView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHomeView>>;

  beforeEach(() => {
    vi.mocked(useStudiesQuery).mockReturnValue({
      data: ref(defaultStudies),
      isLoading: ref(false),
    } as any);

    wrapper = mount(VHomeView, {
      shallow: true,
      global: {
        stubs: {
          VLoggedLayout: VTransparentComponent,
          VCard: false,
          RouterLink: RouterLinkStub,
        },
      },
    });
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
      name: 'modules',
      params: { courseId: defaultStudies[0].id },
    });
  });

  test('if has studies — empty message is not shown', () => {
    expect(getEmptyWrapper().exists()).toBe(false);
  });

  test('if no studies — empty message is shown', async () => {
    vi.mocked(useStudiesQuery).mockReturnValue({
      data: ref(undefined),
      isLoading: ref(false),
    } as any);

    wrapper = mount(VHomeView, {
      shallow: true,
      global: {
        stubs: {
          VCard: false,
          RouterLink: RouterLinkStub,
          VLoggedLayout: VTransparentComponent,
        },
      },
    });

    await nextTick();

    expect(getEmptyWrapper().exists()).toBe(true);
  });
});
