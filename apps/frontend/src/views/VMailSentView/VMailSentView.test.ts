import { vi, describe, beforeEach, expect, test, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VMailSentView from './VMailSentView.vue';
import { getProviderById } from '@brachkow/email-providers';
import type { Provider } from '@brachkow/email-providers';

const GMAIL = getProviderById('GMAIL') as Provider;
const MAILRU = getProviderById('MAILRU') as Provider;

const email = faker.internet.email({ provider: 'foobar.baz' });
const mailRuEmail = faker.internet.email({ provider: 'mail.ru' });
const gmailEmail = faker.internet.email({ provider: 'gmail.com' });

describe('VMailSentView', () => {
  let wrapper: VueWrapper<InstanceType<typeof VMailSentView>>;

  const mountWrapper = (props: Partial<{ email: string }> = {}) => {
    wrapper = mount(VMailSentView, {
      shallow: true,
      props: {
        email,
        ...props,
      },
      global: {
        renderStubDefaultSlot: true,
        stubs: {
          VCard: false,
        },
      },
    });
  };

  beforeEach(() => {
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
    mountWrapper({
      email: faker.helpers.arrayElement([mailRuEmail, gmailEmail]),
    });

    expect(getOpenWrapper().exists()).toBe(true);
  });

  test('button has correct attributes for gmail', async () => {
    mountWrapper({
      email: gmailEmail,
    });

    expect(getOpenWrapper().exists()).toBe(true);
    expect(getOpenWrapper().attributes('href')).toBe(GMAIL.url);
    expect(getOpenWrapper().text()).toContain(GMAIL.label);
  });

  test('button has correct attributes for mailru', async () => {
    mountWrapper({
      email: mailRuEmail,
    });

    expect(getOpenWrapper().exists()).toBe(true);
    expect(getOpenWrapper().attributes('href')).toBe(MAILRU.url);
    expect(getOpenWrapper().text()).toContain(MAILRU.label);
  });
});
