import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VLinksSettings from './VLinksSettings.vue';
import type VTextInput from '@/components/VTextInput/VTextInput.vue';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { faker } from '@faker-js/faker';
import type { User } from '@/api/generated-api';

const defaultData: Partial<User> = {
  id: faker.number.int(),
  username: faker.internet.userName(),
  linkedin_username: faker.internet.userName(),
  github_username: faker.internet.userName(),
  telegram_username: faker.internet.userName(),
};

describe('VLinksSettings', () => {
  let wrapper: VueWrapper<InstanceType<typeof VLinksSettings>>;
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    queryClient.setQueryData(['base', 'user', 'me'], defaultData);

    wrapper = mount(VLinksSettings, {
      shallow: true,
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
        stubs: {
          VCard: false,
        },
      },
    });
  });

  const getGithubWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="github"]');
  const getLinkedinWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="linkedin"]');
  const getTelegramWrapper = () =>
    wrapper.findComponent<typeof VTextInput>('[data-testid="telegram"]');
  const getSaveWrapper = () => wrapper.find('[data-testid="save"]');

  test('fills fields with actual data on mount', async () => {
    await wrapper.vm.$nextTick();

    expect(getGithubWrapper().props().modelValue).toBe(
      defaultData.github_username,
    );
    expect(getLinkedinWrapper().props().modelValue).toBe(
      defaultData.linkedin_username,
    );
    expect(getTelegramWrapper().props().modelValue).toBe(
      defaultData.telegram_username,
    );
  });

  test('sends data on save', async () => {
    const github_username = faker.internet.userName();
    const linkedin_username = faker.internet.userName();
    const telegram_username = faker.internet.userName();

    await wrapper.vm.$nextTick();

    getGithubWrapper().vm.$emit('update:modelValue', github_username);
    getLinkedinWrapper().vm.$emit('update:modelValue', linkedin_username);
    getTelegramWrapper().vm.$emit('update:modelValue', telegram_username);
    await getSaveWrapper().trigger('click');

    const mutationData = queryClient.getMutationCache().getAll()[0]
      .state.variables;
    expect(mutationData).toEqual({
      github_username,
      linkedin_username,
      telegram_username,
    });
  });
});
