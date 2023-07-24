import type { VueWrapper } from '@vue/test-utils';

import { VPasswordSettings } from '@/components/VPasswordSettings';
import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';

import { VLoginChangeView } from '.';

const defaultProps = {};

const uid = faker.string.uuid();
const token = faker.string.uuid();

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { token, uid } }),
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('VLoginChangeView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginChangeView>>;

  beforeEach(() => {
    wrapper = mount(VLoginChangeView, {
      props: defaultProps,
      shallow: true,
    });
  });

  const getPasswordSettingsWrapper = () =>
    wrapper.findComponent(VPasswordSettings);

  test('has proper data in props', () => {
    expect(getPasswordSettingsWrapper().props()).toStrictEqual({ token, uid });
  });

  test('navigates to /login on save', () => {
    getPasswordSettingsWrapper().vm.$emit('save');

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
