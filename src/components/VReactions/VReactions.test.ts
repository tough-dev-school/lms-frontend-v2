import { type VueWrapper, mount } from '@vue/test-utils';
import VReactions, {
  ALLOWED_REACTIONS,
  type VReactionsProps,
} from './VReactions.vue';
import type VReaction from './components/VReaction/VReaction.vue';
import { createTestingPinia } from '@pinia/testing';
import { faker } from '@faker-js/faker';
import { mockReactionsData } from './mocks/mockReactionsData';
import useUser from '@/stores/user';
import { flatten, uniq } from 'lodash';

const defaultProps: VReactionsProps = {
  reactions: mockReactionsData(),
  answerId: faker.string.uuid(),
  open: false,
  disabled: false,
};

const userId = faker.string.uuid();

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
    const slug = faker.string.uuid();

    reaction.vm.$emit('remove', slug);

    expect(wrapper.emitted('remove')).toStrictEqual([[slug]]);
  });

  test('emits add on VReaction add', () => {
    const reaction = getReactionWrapper();
    const emoji = defaultProps.reactions[0].emoji;

    reaction.vm.$emit('add', emoji);

    const emitted = flatten(wrapper.emitted('add'));
    expect(emitted[0]).toStrictEqual(emoji);
    expect(emitted[1]).toBeDefined();
    expect(emitted[1]).toHaveLength(36);
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
