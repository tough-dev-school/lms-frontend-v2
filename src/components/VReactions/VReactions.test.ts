import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { VReactions, type VReactionsProps } from '.';
import { createTestingPinia } from '@pinia/testing';
import { mockReactionData, mockReactionsData } from './mocks/mockReactionsData';
import groupBy from 'lodash/groupBy';
import { faker } from '@faker-js/faker';
import useUser from '@/stores/user';
import { getAuthorData } from '@/mocks/homework';
import type { VReaction } from './components/VReaction';
import { mockEmoji } from '@/mocks/emoji';

const userId = faker.datatype.uuid();

const defaultProps = {
  reactions: [
    { ...mockReactionData(), author: { ...getAuthorData(), uuid: userId } },
    ...mockReactionsData(),
  ],
  answerId: faker.datatype.uuid(),
  palette: true,
  disabled: false,
};

const mountComponent = (
  props: VReactionsProps = defaultProps,
  debug = false,
) => {
  return mount(VReactions, {
    shallow: true,
    props,
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
    const reactionsData = groupBy(
      defaultProps.reactions,
      (reaction) => reaction.emoji,
    );
    const firstEmoji = Object.keys(reactionsData)[0];
    const reaction = getReactionWrapper();

    const props = {
      emoji: firstEmoji,
      reactions: reactionsData[firstEmoji],
      userId,
    };

    expect(reaction.props()).toStrictEqual(props);
  });

  test('displays correct number of reactions', () => {
    const reactionsData = Object.keys(
      groupBy(defaultProps.reactions, (reaction) => reaction.emoji),
    );
    const reactions = getReactionWrappers();

    expect(reactions).toHaveLength(reactionsData.length);
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

  test.todo('hide palette');
});
