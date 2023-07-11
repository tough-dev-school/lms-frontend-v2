import { describe, expect, test, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { VCertificate } from '.';
import getCertificateLink from '@/utils/getCertificateLink';
import merge from 'lodash/merge';
import { mockDiplomaData } from '@/mocks/mockDiploma';

const defaultProps = {
  certificate: mockDiplomaData(),
};

describe('VCertificate', () => {
  let wrapper: VueWrapper<InstanceType<typeof VCertificate>>;

  beforeEach(() => {
    wrapper = mount(VCertificate, { shallow: true, props: defaultProps });
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
      shallow: true,
      props: merge({}, defaultProps, {
        certificate: {
          language: locale,
        },
      }),
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
