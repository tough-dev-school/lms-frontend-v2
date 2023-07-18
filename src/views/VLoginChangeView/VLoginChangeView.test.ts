import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { VLoginChangeView } from '.';
import { VPasswordSettings } from '@/components/VPasswordSettings';
import { faker } from '@faker-js/faker';

const defaultProps = {};

const uid = faker.string.uuid();
const token = faker.string.uuid();

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
  useRoute: () => ({ params: { uid, token } }),
}));

describe('VLoginChangeView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginChangeView>>;

  beforeEach(() => {
    wrapper = mount(VLoginChangeView, {
      shallow: true,
      props: defaultProps,
    });
  });

  const getPasswordSettingsWrapper = () =>
    wrapper.findComponent(VPasswordSettings);

  test('has proper data in props', () => {
    expect(getPasswordSettingsWrapper().props()).toStrictEqual({ uid, token });
  });

  test('navigates to /login on save', () => {
    getPasswordSettingsWrapper().vm.$emit('save');

    expect(routerPushMock).toHaveBeenCalledOnce();
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
