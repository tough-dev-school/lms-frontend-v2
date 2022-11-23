import { describe, expect, test, beforeEach } from 'vitest';
import { shallowMount, VueWrapper, mount } from '@vue/test-utils';
import VAnswer from '@/components/VAnswer.vue';
import getName from '@/utils/getName';
import { getAnswerData } from '@/mocks/homework';
import type VAvatar from '@/components/VAvatar.vue';
import type VHtmlContent from '@/components/VHtmlContent.vue';
import dayjs from 'dayjs';

const defaultProps = {
  answer: getAnswerData(),
};

describe('VAnswer', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswer>>;

  beforeEach(() => {
    wrapper = mount(VAnswer, {
      props: defaultProps,
      shallow: true,
      global: {
        stubs: { VCard: false },
      },
    });
  });

  const getNameWrapper = () => {
    return wrapper.find('[data-testid="name"]');
  };
  const getDateWrapper = () => {
    return wrapper.find('[data-testid="date"]');
  };
  const getAvatarWrapper = () => {
    return wrapper.findComponent<typeof VAvatar>('[data-testid="avatar"]');
  };
  const getContentWrapper = () => {
    return wrapper.findComponent<typeof VHtmlContent>(
      '[data-testid="content"]',
    );
  };

  test('props to display avatar passed to VAvatar', () => {
    const { firstName, lastName } = defaultProps.answer.author;

    expect(getAvatarWrapper().props().firstName).toBe(firstName);
    expect(getAvatarWrapper().props().lastName).toBe(lastName);
  });

  test('answer has author name', () => {
    const { firstName, lastName } = defaultProps.answer.author;

    expect(getNameWrapper().text()).toBe(getName(firstName, lastName));
  });

  test('answer has relative date', () => {
    const years = 10;
    const props = Object.assign({}, defaultProps);
    defaultProps.answer.created = dayjs()
      .subtract(years, 'years')
      .toISOString();

    wrapper = mount(VAnswer, {
      props,
      shallow: true,
      global: {
        stubs: { VCard: false },
      },
    });

    expect(getDateWrapper().text()).toContain(years);
  });

  test('props to render content passed to VHtmlContent', () => {
    expect(getContentWrapper().props().content).toBe(defaultProps.answer.text);
  });
});
