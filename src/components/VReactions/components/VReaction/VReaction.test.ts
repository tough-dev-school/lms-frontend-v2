import { describe, expect, test, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { faker } from '@faker-js/faker';
import { VReaction, type VReactionProps } from '.';
import { ALLOWED_REACTIONS } from '../VReactionsPalette';
import { mockReactionsData } from '../../mocks/mockReactionsData';
import getName from '@/utils/getName';

const emoji = faker.helpers.arrayElement(ALLOWED_REACTIONS);
const userId = faker.datatype.uuid();

const defaultProps: VReactionProps = {
  emoji,
  reactions: mockReactionsData().map((reaction) => {
    reaction.emoji = emoji;
    return reaction;
  }),
  userId,
};

const mountComponent = (props: VReactionProps) => {
  return mount(VReaction, {
    shallow: true,
    props,
  });
};

const mountWithOwn = () => {
  const props: VReactionProps = {
    ...defaultProps,
    reactions: defaultProps.reactions.map((reaction, index) =>
      index === 0
        ? { ...reaction, author: { ...reaction.author, uuid: userId } }
        : reaction,
    ),
  };

  return mountComponent(props);
};

describe('VReaction', () => {
  let wrapper: VueWrapper<InstanceType<typeof VReaction>>;

  beforeEach(() => {
    wrapper = mountComponent(defaultProps);
  });

  const getEmojiWrapper = () => wrapper.find('[data-testid="emoji"]');
  const getAuthorWrapper = () => wrapper.find('[data-testid="author"]');
  const getAvatarWrappers = () =>
    wrapper.findAllComponents('[data-testid="avatar"]');

  const getLastAvatar = () => getAvatarWrappers().slice(-1)[0];

  test('emit add on click if not already sent', () => {
    wrapper.trigger('click');

    expect(wrapper.emitted('add')).toBeTruthy();
  });

  test('emit remove on click if already sent', () => {
    wrapper = mountWithOwn();

    wrapper.trigger('click');

    expect(wrapper.emitted('remove')).toBeTruthy();
  });

  test('displays correct number of avatars', () => {
    expect(getAvatarWrappers()).toHaveLength(defaultProps.reactions.length);
  });

  test('displays tooltip on hover', () => {
    expect(getAuthorWrapper().attributes('title')).toBe(
      getName(
        defaultProps.reactions[0].author.firstName,
        defaultProps.reactions[0].author.lastName,
      ),
    );
  });

  test('displays emoji', () => {
    expect(getEmojiWrapper().text()).toBe(defaultProps.emoji);
  });

  test('passes props to avatar', () => {
    expect(getAvatarWrappers()[0].props('userId')).toBe(
      defaultProps.reactions[0].author.uuid,
    );
  });

  test('own avatar is always last', () => {
    wrapper = mountWithOwn();

    expect(getLastAvatar().props('userId')).toBe(userId);
  });
});
