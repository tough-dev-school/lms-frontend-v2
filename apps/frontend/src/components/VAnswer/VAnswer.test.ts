import { vi, describe, beforeEach, expect, test } from 'vitest';
import { VueWrapper, mount, RouterLinkStub } from '@vue/test-utils';
import VAnswer from '@/components/VAnswer/VAnswer.vue';
import { getName } from '@/utils/getName';
import type VAvatar from '@/components/VAvatar/VAvatar.vue';
import type VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash-es';
import { faker } from '@faker-js/faker';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockUserSafe } from '@/mocks/mockUserSafe';
import {
  useRemoveHomeworkReactionMutation,
  useAddHomeworkReactionMutation,
} from '@/query';

const uuid = faker.string.uuid();

const defaultProps = {
  answer: mockAnswer(),
  user: mockUserSafe({
    payload: {
      uuid,
    },
  }),
};

vi.mock('@formkit/auto-animate/vue', () => ({
  useAutoAnimate: () => [null],
}));

vi.mock('@/query');
vi.mock('@tanstack/vue-query');

const defaultMountOptions = {
  props: defaultProps,
  shallow: true,
  global: {
    stubs: {
      VCard: false,
      RouterLink: RouterLinkStub,
    },
  },
};

describe('VAnswer', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswer>>;

  beforeEach(() => {
    (
      useRemoveHomeworkReactionMutation as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      mutateAsync: vi.fn(),
    });
    (
      useAddHomeworkReactionMutation as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      mutateAsync: vi.fn(),
    });
    wrapper = mount(VAnswer, defaultMountOptions);
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
  const getOwnerBadgeWrapper = () => {
    return wrapper.find('.VAnswer__Name_Own');
  };

  test('props to display avatar passed to VAvatar', () => {
    const { uuid: authorUuid } = defaultProps.answer.author;

    expect(getAvatarWrapper().props().userId).toBe(authorUuid);
  });

  test('answer has author name', () => {
    const { first_name, last_name } = defaultProps.answer.author;

    expect(getNameWrapper().text()).toBe(getName(first_name, last_name));
  });

  test('answer has relative date', () => {
    const years = 10;
    const props = { ...defaultProps };
    defaultProps.answer.created = dayjs()
      .subtract(years, 'years')
      .toISOString();
    wrapper = mount(VAnswer, { ...defaultMountOptions, props });

    expect(getDateWrapper().text()).toContain(years);
  });

  test('props to render content passed to VHtmlContent', () => {
    expect(getContentWrapper().props().html).toBe(defaultProps.answer.content);
  });

  test('answer has own badge if user is not matching author', () => {
    expect(getOwnerBadgeWrapper().exists()).toBe(false);
  });

  test('answer has own badge if user matches author', () => {
    const props = cloneDeep(defaultProps);
    props.answer.author.uuid = uuid;
    wrapper = mount(VAnswer, { ...defaultMountOptions, props });

    expect(getOwnerBadgeWrapper().exists()).toBe(true);
  });
});
