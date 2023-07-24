import type { VueWrapper } from '@vue/test-utils';

import { mockDiplomaData } from '@/mocks/mockDiploma';
import getCertificateLink from '@/utils/getCertificateLink';
import { mount } from '@vue/test-utils';
import merge from 'lodash/merge';

import { VCertificate } from '.';

const defaultProps = {
  certificate: mockDiplomaData(),
};

describe('VCertificate', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificate>>;

  beforeEach(() => {
    wrapper = mount(VCertificate, { props: defaultProps, shallow: true });
  });

  const getImageWrapper = () => {
    return wrapper.find('[data-testid="image"]');
  };
  const getLabelWrapper = () => {
    return wrapper.find('[data-testid="label"]');
  };
  const getDownloadWrapper = () => {
    return wrapper.find('[data-testid="download"]');
  };
  const getLinkedinWrapper = () => {
    return wrapper.find('[data-testid="linkedin"]');
  };

  test('has certificate image', () => {
    expect(getImageWrapper().exists()).toBe(true);
    expect(getImageWrapper().attributes('src')).toBe(
      defaultProps.certificate.image,
    );
  });

  test.each([
    ['RU', 'На русском'],
    ['EN', 'На английском'],
  ])('has language label', (locale, expected) => {
    wrapper = mount(VCertificate, {
      props: merge({}, defaultProps, {
        certificate: {
          language: locale,
        },
      }),
      shallow: true,
    });

    expect(getLabelWrapper().text()).toBe(expected);
  });

  test('has download link', () => {
    expect(!!getDownloadWrapper().text()).toBe(true);
    expect(getDownloadWrapper().attributes('href')).toBe(
      defaultProps.certificate.image,
    );
  });

  test('has linkedin link', () => {
    expect(!!getLinkedinWrapper().text()).toBe(true);
    expect(getLinkedinWrapper().attributes('href')).toBe(
      getCertificateLink(defaultProps.certificate.slug),
    );
  });
});
