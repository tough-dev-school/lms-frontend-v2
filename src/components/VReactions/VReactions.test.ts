import { describe, test, expect, beforeEach, vi } from 'vitest';
import { type VueWrapper, mount } from '@vue/test-utils';
import { ALLOWED_REACTIONS, VReactions, type VReactionsProps } from '.';
import type { VReaction } from './components/VReaction';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';
import { mockReactionsData } from './mocks/mockReactionsData';
import useUser from '@/stores/user';
import { mockEmoji } from '@/mocks/emoji';
import { uniq } from 'lodash';

const defaultProps: VReactionsProps = {
  reactions: mockReactionsData(),
  answerId: faker.datatype.uuid(),
  open: false,
  disabled: false,
};

const userId = faker.datatype.uuid();

const mountComponent = (props: Partial<VReactionsProps> = {}) => {
  return mount(VReactions, {
    shallow: true,
    props: { ...defaultProps, ...props },
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
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
      userId,
      emoji,
      disabled: defaultProps.disabled,
      reactions: defaultProps.reactions.filter(
        (reaction) => reaction.emoji === emoji,
      ),
    };

    expect(getReactionWrapper().props()).toStrictEqual(targetProps);
  });

  test('emits remove on VReaction remove', () => {
    const reaction = getReactionWrapper();
    const slug = faker.datatype.uuid();

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
