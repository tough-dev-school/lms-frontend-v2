import { vi, describe, beforeEach, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import VReactions, {
  ReactionEmoji,
} from '@/components/VReactions/VReactions.vue';
import { faker } from '@faker-js/faker';
import {
  VueQueryPlugin,
  QueryClient,
  type VueQueryPluginOptions,
} from '@tanstack/vue-query';
import type { ReactionDetailed } from '@/api/generated-api';

const defaultUser = {
  uuid: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
};

const createReaction = (
  emoji: ReactionEmoji,
  authorId = defaultUser.uuid,
): ReactionDetailed => ({
  slug: faker.string.uuid(),
  emoji,
  author: {
    uuid: authorId,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
  },
  answer: faker.string.uuid(),
});

const createWrapper = (reactions: ReactionDetailed[] = []) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  queryClient.setQueryData(['base', 'user', 'me'], defaultUser);

  const options: VueQueryPluginOptions = {
    queryClient,
  };

  return mount(VReactions, {
    props: {
      answerId: faker.string.uuid(),
      reactions,
      disabled: false,
    },
    global: {
      plugins: [[VueQueryPlugin, options]],
    },
  });
};

describe('VReactions', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReactions>>;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  const getReactions = () => wrapper.findAllComponents({ name: 'VReaction' });

  test('Shows no reactions when empty', () => {
    expect(getReactions()).toHaveLength(0);
  });

  test('Shows all possible reactions when open', async () => {
    await wrapper.setProps({ open: true });
    expect(getReactions()).toHaveLength(Object.values(ReactionEmoji).length);
  });

  test('Shows only existing reactions when not open', async () => {
    const reactions = [
      createReaction(ReactionEmoji.LIKE),
      createReaction(ReactionEmoji.HEART),
    ];
    wrapper = createWrapper(reactions);
    expect(getReactions()).toHaveLength(2);
  });

  test('Emits add event with correct emoji and generated slug', async () => {
    await wrapper.setProps({ open: true });
    const reaction = getReactions().find(
      (r) => r.props('emoji') === ReactionEmoji.LIKE,
    );
    await reaction?.vm.$emit('add', ReactionEmoji.LIKE);

    const emitted = wrapper.emitted('add');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0][0]).toBe(ReactionEmoji.LIKE);
    expect(typeof emitted?.[0][1]).toBe('string');
  });

  test('Emits remove event with correct reaction id', async () => {
    const reactionId = faker.string.uuid();
    const reactions = [createReaction(ReactionEmoji.LIKE)];
    reactions[0].slug = reactionId;

    wrapper = createWrapper(reactions);
    const reaction = getReactions().at(0);
    await reaction?.vm.$emit('remove', reactionId);

    const emitted = wrapper.emitted('remove');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0][0]).toBe(reactionId);
  });

  test('Disables reactions when user has reached limit', async () => {
    const reactions = [
      createReaction(ReactionEmoji.LIKE),
      createReaction(ReactionEmoji.HEART),
      createReaction(ReactionEmoji.PARTY),
    ];

    wrapper = createWrapper(reactions);
    await wrapper.setProps({ open: true });

    const unusedReaction = getReactions().find(
      (r) => r.props('emoji') === ReactionEmoji.ROCKET,
    );
    expect(unusedReaction?.props('disabled')).toBe(true);
  });

  test('Does not disable reaction that user has already used', async () => {
    const reactions = [
      createReaction(ReactionEmoji.LIKE),
      createReaction(ReactionEmoji.HEART),
      createReaction(ReactionEmoji.PARTY),
    ];

    wrapper = createWrapper(reactions);
    await wrapper.setProps({ open: true });

    const usedReaction = getReactions().find(
      (r) => r.props('emoji') === ReactionEmoji.LIKE,
    );
    expect(usedReaction?.props('disabled')).toBe(false);
  });
});
