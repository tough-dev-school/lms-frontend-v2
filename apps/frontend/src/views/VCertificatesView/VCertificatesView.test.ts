import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificatesView from './VCertificatesView.vue';
import type VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
import { mockDiplomaData, mockDiplomaSet } from '@/mocks/mockDiploma';
import { uniq, flatten } from 'lodash-es';
import { nextTick, ref } from 'vue';
import { faker } from '@faker-js/faker';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import { useDiplomasQuery } from '@/query';

const defaultProps = {};

vi.mock('@/query');

const mockDiplomas = () =>
  flatten(
    faker.helpers.multiple(() => mockDiplomaSet(mockDiplomaData()), {
      count: 5,
    }),
  );

describe('VCertificatesView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificatesView>>;
  let mockDiplomasData: ReturnType<typeof mockDiplomas>;

  beforeEach(() => {
    mockDiplomasData = mockDiplomas();

    vi.mocked(useDiplomasQuery).mockReturnValue({
      data: ref(mockDiplomasData),
      isLoading: ref(false),
    } as any);

    wrapper = mount(VCertificatesView, {
      shallow: true,
      props: defaultProps,
      global: {
        renderStubDefaultSlot: true,
      },
    });
  });

  const getCertificateCardsWrappers = () => {
    return wrapper.findAll('[data-testid="certificate"]');
  };

  const getCertificateCardWrapper = () => {
    return wrapper.findComponent<typeof VCertificateCard>(
      '[data-testid="certificate"]',
    );
  };

  const getEmptyMessageWrapper = () => {
    return wrapper.find('[data-testid="empty"]');
  };

  test('has a card for each course', () => {
    expect(getCertificateCardsWrappers()).toHaveLength(
      uniq(mockDiplomasData.map((diploma) => diploma.course.name)).length,
    );
  });

  test('passes props to card', async () => {
    const courseName = mockDiplomasData[0].course.name;

    expect(getCertificateCardWrapper().props().course).toBe(courseName);
    expect(getCertificateCardWrapper().props().certificates).toStrictEqual(
      mockDiplomasData.filter((diploma) => diploma.course.name === courseName),
    );
  });

  test('has no empty message if no certififcates', () => {
    expect(getEmptyMessageWrapper().exists()).toBe(false);
  });

  test('has an empty message if no certififcates', async () => {
    vi.mocked(useDiplomasQuery).mockReturnValue({
      data: ref([]),
      isLoading: ref(false),
    } as any);

    wrapper = mount(VCertificatesView, {
      shallow: true,
      props: defaultProps,
      global: {
        renderStubDefaultSlot: true,
      },
    });

    await nextTick();

    expect(getEmptyMessageWrapper().exists()).toBe(true);
  });
});
