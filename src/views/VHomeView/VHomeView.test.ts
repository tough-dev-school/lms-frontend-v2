import type { RouterLink } from 'vue-router';

import { mockStudy } from '@/mocks/mockStudy';
import useStudies from '@/stores/studies';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { RouterLinkStub, VueWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import { VHomeView } from '.';

const defaultStudies = faker.helpers.multiple(mockStudy, { count: 3 });

describe('VHomeView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VHomeView>>;
  let studies: ReturnType<typeof useStudies>;

  beforeEach(() => {
    wrapper = mount(VHomeView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          RouterLink: RouterLinkStub,
          VCard: false,
        },
      },
      shallow: true,
    });

    studies = useStudies();

    studies.$patch({ items: defaultStudies });
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

  test('has study names displayed', () => {
    expect(wrapper.text()).toContain(defaultStudies[0].name);
    expect(wrapper.text()).toContain(defaultStudies[1].name);
    expect(wrapper.text()).toContain(defaultStudies[2].name);
  });

  test('click on studies redirects to material', async () => {
    expect(getStudyWrapper().props().to).toStrictEqual({
      name: 'materials',
      params: { id: defaultStudies[0].homePageSlug },
    });
  });

  test('if has studies — empty message is not shown', () => {
    expect(getEmptyWrapper().exists()).toBe(false);
  });

  test('if no studies — empty message is shown', async () => {
    studies.$patch({ items: [] });

    await Promise.resolve(nextTick());

    expect(getEmptyWrapper().exists()).toBe(true);
  });
});
