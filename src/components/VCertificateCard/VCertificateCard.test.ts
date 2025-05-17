import { describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificateCard from './VCertificateCard.vue';
import type VCertificate from '@/components/VCertificate/VCertificate.vue';
import { mockDiplomaData, mockDiplomaSet } from '@/mocks/mockDiploma';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';
import VCard from '@/components/VCard/VCard.vue';

const diplomas = mockDiplomaSet(mockDiplomaData());

const defaultProps = {
  course: diplomas[0].course.name,
  certificates: diplomas,
};

describe('VCertificateCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificateCard>>;

  beforeEach(() => {
    wrapper = mount(VCertificateCard, {
      global: { stubs: { VCard: VTransparentComponent } },
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
