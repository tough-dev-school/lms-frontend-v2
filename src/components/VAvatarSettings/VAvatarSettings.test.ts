import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import useUser from '@/stores/user';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';
import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';

const defaultData = {
  uuid: faker.string.uuid(),
};

describe('VAvatarSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAvatarSettings>>;
  let user: ReturnType<typeof useUser>;

  beforeEach(() => {
    wrapper = mount(VAvatarSettings, {
      shallow: true,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              user: { ...defaultData },
            },
          }),
        ],
        stubs: {
          VCard: false,
        },
      },
    });

    user = useUser();
  });

  const getUploadButton = () => wrapper.find('[data-testid="upload"]');
  const getDeleteButton = () => wrapper.find('[data-testid="delete"]');
  const getSaveButton = () => wrapper.find('[data-testid="save"]');

  test('Should not show delete button when avatar is not filled', () => {
    expect(getDeleteButton().exists()).toBe(false);
  });

  test('Should show delete button when avatar is filled', async () => {
    wrapper.vm.avatar = faker.image.avatar();

    await wrapper.vm.$nextTick();
    expect(getDeleteButton().exists()).toBe(true);
  });

  test('Should not render delete button when avatar was not loaded', async () => {
    expect(getDeleteButton().exists()).toBe(false);
  });

  test('Should reset avatar on delete button click', async () => {
    wrapper.vm.avatar = faker.image.avatar();
    await wrapper.vm.$nextTick();

    const button = getDeleteButton();
    await button.trigger('click');

    expect(wrapper.vm.avatar).toBe(undefined);
  });

  test('Should show cropper on upload button click', async () => {
    const button = getUploadButton();

    await button.trigger('click');

    expect(wrapper.vm.showCropper).toBe(true);
  });

  test('Should call setAvatar with null on save button click', async () => {
    const button = getSaveButton();

    await button.trigger('click');

    expect(user.setAvatar).toHaveBeenCalledWith(null);
  });

  test('Should call setAvatar with file on save button click', async () => {
    const button = getSaveButton();
    const file = new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' });

    wrapper.vm.file = file;
    await wrapper.vm.$nextTick();

    await button.trigger('click');

    expect(user.setAvatar).toHaveBeenCalledWith(file);
  });
});
