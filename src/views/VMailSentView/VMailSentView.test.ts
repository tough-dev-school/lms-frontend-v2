import { mount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';

const email = faker.internet.email({ provider: 'foobar.baz' });
const getQuery = (email: string) => ({ query: { email } });
const useRoute = vi.fn();

vi.doMock('vue-router', () => ({
  useRoute,
}));

import { VMailSentView } from '.';
import { getProviderById, type Provider } from '@brachkow/email-providers';

const GMAIL = getProviderById('GMAIL') as Provider;
const MAILRU = getProviderById('MAILRU') as Provider;

const gmailEmailQuery = getQuery('john@gmail.com');
const mailruEmailQuery = getQuery('ivan@mail.ru');

describe('VMailSentView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VMailSentView>>;

  const mountWrapper = () => {
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
  };

  beforeEach(() => {
    useRoute.mockReturnValue(getQuery(email));

    mountWrapper();
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
    mountWrapper();

    expect(getOpenWrapper().exists()).toBe(true);
  });

  test('button has correct attributes for gmail', async () => {
    useRoute.mockReturnValueOnce(gmailEmailQuery);
    mountWrapper();

    expect(getOpenWrapper().exists()).toBe(true);
    expect(getOpenWrapper().attributes('href')).toBe(GMAIL.url);
    expect(getOpenWrapper().text()).toContain(GMAIL.label);
  });

  test('button has correct attributes for mailru', async () => {
    useRoute.mockReturnValueOnce(mailruEmailQuery);
    mountWrapper();

    expect(getOpenWrapper().exists()).toBe(true);
    expect(getOpenWrapper().attributes('href')).toBe(MAILRU.url);
    expect(getOpenWrapper().text()).toContain(MAILRU.label);
  });
});
