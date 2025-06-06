import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLoginChangeView from './VLoginChangeView.vue';
import VPasswordSettings from '@/components/VPasswordSettings/VPasswordSettings.vue';
import { faker } from '@faker-js/faker';

const uid = faker.string.uuid();
const token = faker.string.uuid();

const defaultProps = {
  uid,
  token,
};

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('VLoginChangeView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLoginChangeView>>;

  beforeEach(() => {
    wrapper = mount(VLoginChangeView, {
      shallow: true,
      props: defaultProps,
      global: {
        renderStubDefaultSlot: true,
      },
    });
  });

  const getPasswordSettingsWrapper = () =>
    wrapper.findComponent(VPasswordSettings);

  test('has proper data in props', () => {
    expect(getPasswordSettingsWrapper().props()).toStrictEqual({ uid, token });
  });

  test('navigates to /login on save', () => {
    getPasswordSettingsWrapper().vm.$emit('save');

    expect(routerPushMock).toHaveBeenCalledTimes(1);
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'login' });
  });
});
