import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificatesView from './VCertificatesView.vue';
import type VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
import { createDiploma, LanguageEnum } from '@/api/generated';
import type { Diploma } from '@/api/generated';
import { uniq, flatten } from 'es-toolkit/compat';
import { faker } from '@faker-js/faker';
import { describe, beforeEach, expect, test } from 'vitest';

const mountView = (diplomas: Diploma[]) =>
  mount(VCertificatesView, {
    shallow: true,
    props: { diplomas },
    global: {
      renderStubDefaultSlot: true,
    },
  });

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
    wrapper = mountView(mockDiplomasData);
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

  test('has an empty message if no certififcates', () => {
    wrapper = mountView([]);

    expect(getEmptyMessageWrapper().exists()).toBe(true);
  });
});
