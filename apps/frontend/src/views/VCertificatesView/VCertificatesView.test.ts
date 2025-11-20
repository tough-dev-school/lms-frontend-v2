import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificatesView from './VCertificatesView.vue';
import type VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
import { createDiploma } from '@/api/generated/mocks';
import { LanguageEnum } from '@/api/generated/types';
import type { Diploma } from '@/api/generated/types';
import { uniq, flatten } from 'lodash-es';
import { nextTick, ref } from 'vue';
import { faker } from '@faker-js/faker';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import { useDiplomasList } from '@/api/generated/hooks';

const defaultProps = {};

vi.mock('@/api/generated/hooks');

const createDiplomaSet = (payload: Diploma): Diploma[] => {
  return Object.values(LanguageEnum).map((locale) => {
    return {
      ...payload,
      language: locale,
      course: {
        name: payload.course.name,
        name_international: payload.course.name_international,
        product_name: payload.course.product_name,
        tariff_name: payload.course.tariff_name,
      },
    };
  });
};

const mockDiplomas = () =>
  flatten(
    faker.helpers.multiple(() => createDiplomaSet(createDiploma()), {
      count: 5,
    }),
  );

describe('VCertificatesView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificatesView>>;
  let mockDiplomasData: ReturnType<typeof mockDiplomas>;

  beforeEach(() => {
    mockDiplomasData = mockDiplomas();

    vi.mocked(useDiplomasList).mockReturnValue({
      data: ref({ results: mockDiplomasData }),
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
      uniq(mockDiplomasData.map((diploma) => diploma.course.product_name))
        .length,
    );
  });

  test('passes props to card', async () => {
    const courseName = mockDiplomasData[0].course.product_name;

    expect(getCertificateCardWrapper().props().course).toBe(courseName);
    expect(getCertificateCardWrapper().props().certificates).toStrictEqual(
      mockDiplomasData.filter(
        (diploma) => diploma.course.product_name === courseName,
      ),
    );
  });

  test('has no empty message if no certififcates', () => {
    expect(getEmptyMessageWrapper().exists()).toBe(false);
  });

  test('has an empty message if no certififcates', async () => {
    vi.mocked(useDiplomasList).mockReturnValue({
      data: ref({ results: [] }),
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
