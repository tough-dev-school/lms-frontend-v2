import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificateCard from './VCertificateCard.vue';
import type VCertificate from '@/components/VCertificate/VCertificate.vue';
import { createDiploma } from '@/api/generated/mocks';
import { LanguageEnum } from '@/api/generated/types';
import type { Diploma } from '@/api/generated/types';
import VCard from '@/components/VCard/VCard.vue';

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

const diplomas = createDiplomaSet(createDiploma());

const defaultProps = {
  course: diplomas[0].course.product_name,
  certificates: diplomas,
};

describe('VCertificateCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificateCard>>;

  beforeEach(() => {
    wrapper = mount(VCertificateCard, {
      global: {
        renderStubDefaultSlot: true,
      },
      shallow: true,
      props: defaultProps,
    });
  });

  const getContainerWrapper = () => {
    return wrapper.findComponent<typeof VCard>('[data-testid="container"]');
  };

  const getCertificatesWrappers = () => {
    return wrapper.findAll('[data-testid="certificate"]');
  };

  const getCertificateWrapper = () => {
    return wrapper.findComponent<typeof VCertificate>(
      '[data-testid="certificate"]',
    );
  };

  test('has course name', () => {
    expect(getContainerWrapper().attributes('title')).toContain(
      defaultProps.course,
    );
  });

  test('passes props to VCertificate', () => {
    expect(getCertificateWrapper().props()).toStrictEqual({
      certificate: defaultProps.certificates[0],
    });
  });

  test('displays certificates', () => {
    expect(getCertificatesWrappers()).toHaveLength(
      defaultProps.certificates.length,
    );
  });
});
