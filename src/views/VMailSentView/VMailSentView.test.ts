import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { VMailSentView } from '.';
import { faker } from '@faker-js/faker';

const email = faker.internet.email();

vi.mock('vue-router/dist/vue-router.mjs', () => ({
  useRoute: () => ({
    query: {
      email,
    },
  }),
}));

describe('VMailSentView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VMailSentView>>;

  beforeEach(() => {
    wrapper = mount(VMailSentView, {
      shallow: true,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          VCard: false,
        },
      },
    });
  });

  const getMessageWrapper = () => {
    return wrapper.find(`[data-testid="message"]`);
  };
  const getOpenWrapper = () => {
    return wrapper.find(`[data-testid="open"]`);
  };

  test('message contains email', () => {
    expect(getMessageWrapper().text()).toContain(email);
  });

  test.todo('button is not shown if email service is not recognized');

  test.todo('button is shown if email service is recognized');

  test.todo('button has correct attributes');
});
