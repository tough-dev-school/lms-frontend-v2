import { describe, expect, test, beforeEach, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { VReactions } from '.';
import {
  ALLOWED_REACTIONS,
  type VReactionsPalette,
} from './components/VReactionsPalette';
import { createTestingPinia } from '@pinia/testing';
import useHomework from '@/stores/homework';
import { mockReactionData, mockReactionsData } from './mocks/mockReactionsData';
import groupBy from 'lodash/groupBy';
import { faker } from '@faker-js/faker';
import useUser from '@/stores/user';
import { getAuthorData } from '@/mocks/homework';
import type { VReaction } from './components/VReaction';

const userId = faker.datatype.uuid();

const defaultProps = {
  reactions: [
    { ...mockReactionData(), author: { ...getAuthorData(), uuid: userId } },
    ...mockReactionsData(),
  ],
  answerId: faker.datatype.uuid(),
};

describe('VReactions', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReactions>>;
  let homeworkStore: ReturnType<typeof useHomework>;
  let userStore: ReturnType<typeof useUser>;

  beforeEach(() => {
    wrapper = mount(VReactions, {
      shallow: true,
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    homeworkStore = useHomework();
    userStore = useUser();

    userStore.uuid = userId;
  });

  const getPaletteWrapper = () =>
    wrapper.findComponent<typeof VReactionsPalette>('[data-testid="palette"]');

  const getReactionWrappers = () =>
    wrapper.findAllComponents('[data-testid="reaction"]');

  const getReactionWrapper = () => getReactionWrappers()[0];

  test('passes props to VReactionsPalette', () => {
    const palette = getPaletteWrapper();

    const props = {
      usedReactions: defaultProps.reactions
        .filter((reaction) => {
          return reaction.author.uuid === userId;
        })
        .map((reaction) => reaction.emoji),
    };

    expect(palette.props()).toStrictEqual(props);
  });

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

  test('calls addReaction on VReactionsPalette click', () => {
    const palette = getPaletteWrapper();

    const emoji = faker.helpers.arrayElement(ALLOWED_REACTIONS);
    palette.vm.$emit('click', emoji);

    expect(homeworkStore.addReaction).toHaveBeenCalledTimes(1);
    expect(homeworkStore.addReaction).toHaveBeenCalledWith(
      defaultProps.answerId,
      emoji,
    );
  });

  test('emits update on VReactionsPalette click', () => {
    const palette = getPaletteWrapper();

    const emoji = faker.helpers.arrayElement(ALLOWED_REACTIONS);
    palette.vm.$emit('click', emoji);

    expect(wrapper.emitted('update')).toBeTruthy();
  });

  test('calls removeReaction on VReaction remove', () => {
    const reaction = getReactionWrapper();
    const slug = defaultProps.reactions[0].slug;

    reaction.vm.$emit('remove', slug);

    expect(homeworkStore.removeReaction).toHaveBeenCalledTimes(1);
    expect(homeworkStore.removeReaction).toHaveBeenCalledWith(
      defaultProps.answerId,
      slug,
    );
  });

  test('emits update on VReaction remove', () => {
    const reaction = getReactionWrapper();

    reaction.vm.$emit('remove');

    expect(wrapper.emitted('update')).toBeTruthy();
  });

  test('calls addReaction on VReaction add', () => {
    const reaction = getReactionWrapper();
    const emoji = defaultProps.reactions[0].emoji;

    reaction.vm.$emit('add', emoji);

    expect(homeworkStore.addReaction).toHaveBeenCalledTimes(1);
    expect(homeworkStore.addReaction).toHaveBeenCalledWith(
      defaultProps.answerId,
      emoji,
    );
  });

  test('emits update on VReaction add', () => {
    const reaction = getReactionWrapper();

    reaction.vm.$emit('add');

    expect(wrapper.emitted('update')).toBeTruthy();
  });
});
