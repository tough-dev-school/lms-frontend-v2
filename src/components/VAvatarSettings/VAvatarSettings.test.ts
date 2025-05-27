import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';
import {
  VueQueryPlugin,
  QueryClient,
  type VueQueryPluginOptions,
} from '@tanstack/vue-query';

const defaultData = {
  uuid: faker.string.uuid(),
  avatar: undefined,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const options: VueQueryPluginOptions = {
    queryClient,
  };

  return mount(VAvatarSettings, {
    shallow: true,
    global: {
      plugins: [[VueQueryPlugin, options]],
      stubs: {
        VCard: false,
        AvatarCropper: true,
      },
    },
  });
};

describe('VAvatarSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAvatarSettings>>;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  const getUploadButton = () => wrapper.find('[data-testid="upload"]');
  const getDeleteButton = () => wrapper.find('[data-testid="delete"]');
  const getSaveButton = () => wrapper.find('[data-testid="save"]');

  test('Should not show delete button when avatar is not filled', () => {
    expect(getDeleteButton().exists()).toBe(false);
  });

  test('Should show delete button when avatar is filled', async () => {
    (wrapper.vm as any).avatar = faker.image.avatar();

    await wrapper.vm.$nextTick();
    expect(getDeleteButton().exists()).toBe(true);
  });

  test('Should not render delete button when avatar was not loaded', async () => {
    expect(getDeleteButton().exists()).toBe(false);
  });

  test('Should reset avatar on delete button click', async () => {
    (wrapper.vm as any).avatar = faker.image.avatar();
    await wrapper.vm.$nextTick();

    const button = getDeleteButton();
    await button.trigger('click');

    expect((wrapper.vm as any).avatar).toBe(undefined);
  });

  test('Should show cropper on upload button click', async () => {
    const button = getUploadButton();

    await button.trigger('click');

    expect((wrapper.vm as any).showCropper).toBe(true);
  });

  test('Should call updateAvatar with null on save button click', async () => {
    const button = getSaveButton();
    const updateAvatarSpy = vi.spyOn(wrapper.vm as any, 'updateAvatar');

    await button.trigger('click');

    expect(updateAvatarSpy).toHaveBeenCalledWith(null);
  });

  test('Should call updateAvatar with file on save button click', async () => {
    const button = getSaveButton();
    const file = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });
    const updateAvatarSpy = vi.spyOn(wrapper.vm as any, 'updateAvatar');

    (wrapper.vm as any).file = file;
    await wrapper.vm.$nextTick();

    await button.trigger('click');

    expect(updateAvatarSpy).toHaveBeenCalledWith(file);
  });
});
