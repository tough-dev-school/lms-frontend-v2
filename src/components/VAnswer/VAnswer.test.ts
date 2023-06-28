import { describe, expect, test, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { VueWrapper, mount, RouterLinkStub } from '@vue/test-utils';
import { VAnswer } from '@/components/VAnswer';
import getName from '@/utils/getName';
import type { VAvatar } from '@/components/VAvatar';
import type { VHtmlContent } from '@/components/VHtmlContent';
import dayjs from 'dayjs';
import cloneDeep from 'lodash/cloneDeep';
import { faker } from '@faker-js/faker';
import { mockAnswer } from '@/mocks/mockAnswer';

const uuid = faker.string.uuid();

const defaultProps = {
  answer: mockAnswer(),
};

const defaultMountOptions = {
  props: defaultProps,
  shallow: true,
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn,
        initialState: {
          user: {
            uuid,
          },
        },
      }),
    ],
    stubs: {
      VCard: false,
      RouterLink: RouterLinkStub,
    },
  },
};

describe('VAnswer', () => {
  let wrapper: VueWrapper<InstanceType<typeof VAnswer>>;

  beforeEach(() => {
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
    return wrapper.find('[data-testid="own-badge"]');
  };

  test('props to display avatar passed to VAvatar', () => {
    const { uuid } = defaultProps.answer.author;

    expect(getAvatarWrapper().props().userId).toBe(uuid);
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
    wrapper = mount(VAnswer, { ...defaultMountOptions, props });

    expect(getDateWrapper().text()).toContain(years);
  });

  test('props to render content passed to VHtmlContent', () => {
    expect(getContentWrapper().props().content).toBe(defaultProps.answer.text);
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
