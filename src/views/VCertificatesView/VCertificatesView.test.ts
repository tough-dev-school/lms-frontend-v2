import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificatesView from './VCertificatesView.vue';
import type VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
import { createTestingPinia } from '@pinia/testing';
import { mockDiplomaData, mockDiplomaSet } from '@/mocks/mockDiploma';
import useDiplomas from '@/stores/diplomas';
import { uniq, flatten } from 'lodash-es';
import { nextTick } from 'vue';
import { faker } from '@faker-js/faker';
import { vi, describe, beforeEach, expect, test } from 'vitest';

const defaultProps = {};

const mockDiplomas = () =>
  flatten(
    faker.helpers.multiple(() => mockDiplomaSet(mockDiplomaData()), {
      count: 5,
    }),
  );

describe('VCertificatesView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificatesView>>;
  let diplomas: ReturnType<typeof useDiplomas>;

  beforeEach(() => {
    wrapper = mount(VCertificatesView, {
      shallow: true,
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              diplomas: {
                items: mockDiplomas(),
              },
            },
          }),
        ],
      },
    });

    diplomas = useDiplomas();
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
      uniq(diplomas.items.map((diploma) => diploma.course.name)).length,
    );
  });

  test('passes props to card', async () => {
    const courseName = diplomas.items[0].course.name;

    expect(getCertificateCardWrapper().props().course).toBe(courseName);
    expect(getCertificateCardWrapper().props().certificates).toStrictEqual(
      diplomas.items.filter((diploma) => diploma.course.name === courseName),
    );
  });

  test('has no empty message if no certififcates', () => {
    expect(getEmptyMessageWrapper().exists()).toBe(false);
  });

  test('has an empty message if no certififcates', async () => {
    diplomas.items = [];

    await nextTick();

    expect(getEmptyMessageWrapper().exists()).toBe(true);
  });
});
