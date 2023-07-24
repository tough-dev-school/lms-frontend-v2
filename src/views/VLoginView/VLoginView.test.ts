import type { VLoginLink } from '@/components/VLoginLink';
import type { VLoginPassword } from '@/components/VLoginPassword';
import type { VueWrapper } from '@vue/test-utils';

import { mount } from '@vue/test-utils';

import { VLoginView } from '.';

describe('VLoginView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginView>>;

  beforeEach(() => {
    wrapper = mount(VLoginView, { shallow: true });
  });

  const getLoginLinkWrapper = () => {
    return wrapper.findComponent<typeof VLoginLink>(
      '[data-testid="login-link"]',
    );
  };
  const getLoginPasswordWrapper = () => {
    return wrapper.findComponent<typeof VLoginPassword>(
      '[data-testid="login-password"]',
    );
  };

  test('should render link login by default', () => {
    expect(getLoginLinkWrapper().exists()).toBe(true);
  });

  test('should render password login if mode changed to password', async () => {
    await getLoginLinkWrapper().trigger('change');

    expect(getLoginPasswordWrapper().exists()).toBe(true);
  });

  test('should render link login if mode changed to link', async () => {
    await getLoginLinkWrapper().trigger('change');
    await getLoginPasswordWrapper().trigger('change');

    expect(getLoginLinkWrapper().exists()).toBe(true);
  });
});
