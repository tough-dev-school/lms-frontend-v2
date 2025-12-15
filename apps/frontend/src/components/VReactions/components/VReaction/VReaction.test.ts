import { describe, beforeEach, expect, test } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import VReaction from './VReaction.vue';
import type { VReactionProps } from './VReaction.vue';
import { ALLOWED_REACTIONS } from '@/components/VReactions/VReactions.vue';
import { getName } from '@/utils/getName';
import type VAvatar from '@/components/VAvatar/VAvatar.vue';
import { times } from 'lodash-es';
import { createReactionDetailed } from '@/api/generated';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';

const emoji = faker.helpers.arrayElement(ALLOWED_REACTIONS);
const userId = faker.string.uuid();

const defaultProps = {
  emoji,
  reactions: times(faker.number.int({ min: 1, max: 10 }), () =>
    createReactionDetailed(),
  ),
  disabled: false,
  userId,
};

const mountComponent = (props: Partial<VReactionProps> = {}) => {
  return mount(VReaction, {
    shallow: true,
    props: { ...defaultProps, ...props },
    global: {
      renderStubDefaultSlot: true,
      stubs: {
        VButton: false,
        VAvatar: VTransparentComponent,
      },
    },
  });
};

const withOwnProps = {
  reactions: defaultProps.reactions.map((reaction, index) =>
    index === 0
      ? { ...reaction, author: { ...reaction.author, uuid: userId } }
      : reaction,
  ),
};

const mountWithOwn = () => {
  return mountComponent(withOwnProps);
};

describe('VReaction', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReaction>>;

  beforeEach(() => {
    wrapper = mountComponent(defaultProps);
  });

  const getEmojiWrapper = () => wrapper.find('[data-testid="emoji"]');
  const getAuthorWrapper = () => wrapper.find('[data-testid="author"]');
  const getAvatarWrappers = () =>
    wrapper.findAllComponents<typeof VAvatar>('[data-testid="avatar"]');

  const getLastAvatar = () => getAvatarWrappers().at(-1);

  test('emit add on click if not already sent', () => {
    wrapper.trigger('click');

    expect(wrapper.emitted('add')).toStrictEqual([[defaultProps.emoji]]);
  });

  test('emit remove on click if already sent', () => {
    wrapper = mountWithOwn();
    const targetSlug = withOwnProps.reactions.find(
      (reaction) => reaction.author.uuid === userId,
    )?.slug;

    wrapper.trigger('click');

    expect(wrapper.emitted('remove')).toStrictEqual([[targetSlug]]);
  });

  test('dont emit anything if disabled', () => {
    wrapper = mountComponent({ ...defaultProps, disabled: true });

    wrapper.trigger('click');

    expect(wrapper.emitted('add')).toBe(undefined);
    expect(wrapper.emitted('remove')).toBe(undefined);
  });

  test('displays correct number of avatars', () => {
    expect(getAvatarWrappers()).toHaveLength(defaultProps.reactions.length);
  });

  test('displays tooltip on hover', () => {
    expect(getAuthorWrapper().attributes('title')).toBe(
      getName(
        defaultProps.reactions[0].author.first_name,
        defaultProps.reactions[0].author.last_name,
      ),
    );
  });

  test('displays emoji', () => {
    expect(getEmojiWrapper().text()).toBe(defaultProps.emoji);
  });

  test('passes props to avatar', () => {
    expect(getAvatarWrappers()[0].attributes('user-id')).toBe(
      defaultProps.reactions[0].author.uuid,
    );
  });

  test('own avatar is always last', () => {
    wrapper = mountWithOwn();

    expect(getLastAvatar()!.attributes('user-id')).toBe(userId);
  });
});
