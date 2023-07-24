import type { VueWrapper } from '@vue/test-utils';
import type { RouterLink } from 'vue-router';

import { RouterLinkStub, mount } from '@vue/test-utils';

import { VSettingsView } from '.';

const defaultProps = {};

describe('VSettingsView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VSettingsView>>;

  beforeEach(() => {
    wrapper = mount(VSettingsView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          VCard: false,
        },
      },
      props: defaultProps,
      shallow: true,
    });
  });

  const getLinksLink = () => {
    return wrapper.findComponent<typeof RouterLink>(
      '[data-testid="links-link"]',
    );
  };
  const getPasswordLink = () => {
    return wrapper.findComponent<typeof RouterLink>(
      '[data-testid="password-link"]',
    );
  };
  const getCertificateLink = () => {
    return wrapper.findComponent<typeof RouterLink>(
      '[data-testid="certificate-link"]',
    );
  };

  const getLinksSettings = () => {
    return wrapper.find('[data-testid="links-settings"]');
  };
  const getPasswordSettings = () => {
    return wrapper.find('[data-testid="password-settings"]');
  };
  const getCertificateSettings = () => {
    return wrapper.find('[data-testid="certificate-settings"]');
  };

  test('has table of contents', () => {
    expect(getLinksLink().props().to.hash).toBe(
      `#${getLinksSettings().element.id}`,
    );
    expect(getPasswordLink().props().to.hash).toBe(
      `#${getPasswordSettings().element.id}`,
    );
    expect(getCertificateLink().props().to.hash).toBe(
      `#${getCertificateSettings().element.id}`,
    );
  });
});
