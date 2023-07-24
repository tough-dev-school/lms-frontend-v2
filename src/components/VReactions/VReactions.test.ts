import { mockEmoji } from '@/mocks/mockEmoji';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { type VueWrapper, mount } from '@vue/test-utils';
import { uniq } from 'lodash';

import type { VReaction } from './components/VReaction';

import { ALLOWED_REACTIONS, VReactions, type VReactionsProps } from '.';
import { mockReactionsData } from './mocks/mockReactionsData';

const defaultProps: VReactionsProps = {
  answerId: faker.string.uuid(),
  disabled: false,
  open: false,
  reactions: mockReactionsData(),
};

const userId = faker.string.uuid();

const mountComponent = (props: Partial<VReactionsProps> = {}) => {
  return mount(VReactions, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
    props: { ...defaultProps, ...props },
    shallow: true,
  });
};

describe('VReactions', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReactions>>;
  let userStore: ReturnType<typeof useUser>;

  beforeEach(() => {
    wrapper = mountComponent();

    userStore = useUser();

    userStore.uuid = userId;
  });

  const getReactionWrappers = () =>
    wrapper.findAllComponents<typeof VReaction>('[data-testid="reaction"]');
  const getReactionWrapper = () => getReactionWrappers()[0];

  test('passes props to VReaction', () => {
    const emoji = defaultProps.reactions.sort((a, b) => {
      return (
        ALLOWED_REACTIONS.indexOf(a.emoji) - ALLOWED_REACTIONS.indexOf(b.emoji)
      );
    })[0].emoji;
    const targetProps = {
      disabled: defaultProps.disabled,
      emoji,
      reactions: defaultProps.reactions.filter(
        (reaction) => reaction.emoji === emoji,
      ),
      userId,
    };

    expect(getReactionWrapper().props()).toStrictEqual(targetProps);
  });

  test('emits remove on VReaction remove', () => {
    const reaction = getReactionWrapper();
    const slug = faker.string.uuid();

    reaction.vm.$emit('remove', slug);

    expect(wrapper.emitted('remove')).toStrictEqual([[slug]]);
  });

  test('emits add on VReaction add', () => {
    const reaction = getReactionWrapper();
    const emoji = mockEmoji();

    reaction.vm.$emit('add', emoji);

    expect(wrapper.emitted('add')).toStrictEqual([[emoji]]);
  });

  test('displays only existing reactions when closed', () => {
    const targetLength = uniq(
      defaultProps.reactions.map((reaction) => reaction.emoji),
    ).length;

    expect(getReactionWrappers().length).toBe(targetLength);
  });

  test('displays all reactions when open', () => {
    wrapper = mountComponent({ open: true });

    const total = getReactionWrappers().length;

    expect(total).toBe(ALLOWED_REACTIONS.length);
  });

  test('displays reaction on correct order', () => {
    wrapper = mountComponent({ open: true });
    const order = getReactionWrappers().map((reactionWrapper) =>
      reactionWrapper.props('emoji'),
    );

    expect(order).toStrictEqual(ALLOWED_REACTIONS);
  });
});
