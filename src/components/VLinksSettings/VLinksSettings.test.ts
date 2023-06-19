import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLinksSettings from './VLinksSettings';
import type VTextInput from './VTextInput';
import useUser from '@/stores/user';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';

const defaultData = {
  linkedinUsername: faker.internet.userName(),
  githubUsername: faker.internet.userName(),
  telegramUsername: faker.internet.userName(),
};

describe('VLinksSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLinksSettings>>;
  let user: ReturnType<typeof useUser>;

  beforeEach(() => {
    wrapper = mount(VLinksSettings, {
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

  const getGithubWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="github"]');
  const getLinkedinWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="linkedin"]');
  const getTelegramWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="telegram"]');
  const getSaveWrapper = () => wrapper.find('[data-testid="save"]');

  test('fills fields with actual data on mount', async () => {
    expect(getGithubWrapper().props().modelValue).toBe(
      defaultData.githubUsername,
    );
    expect(getLinkedinWrapper().props().modelValue).toBe(
      defaultData.linkedinUsername,
    );
    expect(getTelegramWrapper().props().modelValue).toBe(
      defaultData.telegramUsername,
    );
  });

  test('fills fields with actual data on save', async () => {
    const githubUsername = faker.internet.userName();
    const linkedinUsername = faker.internet.userName();
    const telegramUsername = faker.internet.userName();
    user.$patch({
      githubUsername,
      linkedinUsername,
      telegramUsername,
    });

    await getSaveWrapper().trigger('click');

    expect(getGithubWrapper().props().modelValue).toBe(githubUsername);
    expect(getLinkedinWrapper().props().modelValue).toBe(linkedinUsername);
    expect(getTelegramWrapper().props().modelValue).toBe(telegramUsername);
  });

  test('sends data on save', async () => {
    const githubUsername = faker.internet.userName();
    const linkedinUsername = faker.internet.userName();
    const telegramUsername = faker.internet.userName();

    getGithubWrapper().vm.$emit('update:modelValue', githubUsername);
    getLinkedinWrapper().vm.$emit('update:modelValue', linkedinUsername);
    getTelegramWrapper().vm.$emit('update:modelValue', telegramUsername);
    await getSaveWrapper().trigger('click');

    expect(user.setData).toHaveBeenCalledOnce();
    expect(user.setData).toHaveBeenCalledWith({
      githubUsername,
      linkedinUsername,
      telegramUsername,
    });
  });
});
