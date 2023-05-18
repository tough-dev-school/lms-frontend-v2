import { describe, expect, test, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VCertificateCard from './VCertificateCard.vue';
import { getDiplomasData } from '@/mocks/diplomas';
import type VCertificate from './VCertificate.vue';

const diplomas = getDiplomasData();

const defaultProps = {
  course: diplomas[0].course.name,
  certificates: diplomas,
};

describe('VCertificateCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificateCard>>;

  beforeEach(() => {
    wrapper = mount(VCertificateCard, {
      global: { stubs: { VCard: false, VHeading: false } },
      shallow: true,
      props: defaultProps,
    });
  });

  const getCourseNameWrapper = () => {
    return wrapper.find('[data-testid="name"]');
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
    expect(getCourseNameWrapper().text()).toContain(defaultProps.course);
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
