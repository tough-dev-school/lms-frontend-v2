import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';

const email = faker.internet.email();
const getQuery = (email: string) => ({ query: { email } });
const useRoute = vi.fn(() => getQuery(email));
vi.mock('vue-router/dist/vue-router.mjs', () => ({
  useRoute,
}));

import { VMailSentView, GMAIL, MAILRU } from '.';

const gmailEmailQuery = getQuery('john@gmail.com');
const mailruEmailQuery = getQuery('ivan@mail.ru');

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

  afterEach(() => {
    vi.resetAllMocks();
  });

  const getMessageWrapper = () => {
    return wrapper.find(`[data-testid="message"]`);
  };
  const getOpenWrapper = () => {
    return wrapper.find(`[data-testid="open"]`);
  };

  test.todo('message contains email', () => {
    expect(getMessageWrapper().text()).toContain(email);
  });

  test.todo('button is not shown if email service is not recognized', () => {
    expect(getOpenWrapper().exists()).toBe(false);
  });

  test.todo('button is shown if email service is recognized', async () => {
    useRoute.mockReturnValueOnce(
      faker.helpers.arrayElement([mailruEmailQuery, gmailEmailQuery]),
    );

    expect(getOpenWrapper().exists()).toBe(true);
  });

  test.todo('button has correct attributes for gmail', async () => {
    useRoute.mockReturnValueOnce(gmailEmailQuery);

    expect(getOpenWrapper().exists()).toBe(true);
    expect(getOpenWrapper().attributes('href')).toBe(GMAIL.url);
    expect(getOpenWrapper().text()).toContain(GMAIL.label);
  });

  test.todo('button has correct attributes for mailru', async () => {
    useRoute.mockReturnValueOnce(mailruEmailQuery);

    expect(getOpenWrapper().exists()).toBe(true);
    expect(getOpenWrapper().attributes('href')).toBe(MAILRU.url);
    expect(getOpenWrapper().text()).toContain(MAILRU.label);
  });
});
