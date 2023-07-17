import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';

const useRoute = vi.fn();
vi.mock('vue-router/dist/vue-router.mjs', () => ({
  useRoute,
}));

import { VMailSentView, GMAIL, MAILRU } from '.';

const email = faker.internet.email();
const getQuery = (email: string) => ({ query: { email } });

const gmailEmailQuery = getQuery('john@gmail.com');
const mailruEmailQuery = getQuery('ivan@mail.ru');

describe('VMailSentView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VMailSentView>>;

  beforeEach(() => {
    useRoute.mockReturnValue(getQuery(email));

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

  test('button is not shown if email service is not recognized', () => {
    expect(getOpenWrapper().exists()).toBe(false);
  });

  test('button is shown if email service is recognized', async () => {
    useRoute.mockReturnValueOnce(
      faker.helpers.arrayElement([mailruEmailQuery, gmailEmailQuery]),
    );

    expect(getOpenWrapper().exists()).toBe(true);
  });

  test('button has correct attributes for gmail', async () => {
    useRoute.mockReturnValueOnce(gmailEmailQuery);

    expect(getOpenWrapper().exists()).toBeTruthy();
    expect(getOpenWrapper().attributes('href')).toBeTruthy(GMAIL.url);
    expect(getOpenWrapper().text()).toContain(GMAIL.label);
  });

  test('button has correct attributes for mailru', async () => {
    useRoute.mockReturnValueOnce(mailruEmailQuery);

    expect(getOpenWrapper().exists()).toBeTruthy();
    expect(getOpenWrapper().attributes('href')).toBeTruthy(MAILRU.url);
    expect(getOpenWrapper().text()).toContain(MAILRU.label);
  });
});
