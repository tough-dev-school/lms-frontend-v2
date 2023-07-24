import type { VCertificate } from '@/components/VCertificate';
import type { VueWrapper } from '@vue/test-utils';

import { mockDiplomaData, mockDiplomaSet } from '@/mocks/mockDiploma';
import { mount } from '@vue/test-utils';

import { VCertificateCard } from '.';

const diplomas = mockDiplomaSet(mockDiplomaData());

const defaultProps = {
  certificates: diplomas,
  course: diplomas[0].course.name,
};

describe('VCertificateCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificateCard>>;

  beforeEach(() => {
    wrapper = mount(VCertificateCard, {
      global: { stubs: { VCard: false, VHeading: false } },
      props: defaultProps,
      shallow: true,
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
