import { vi, describe, beforeEach, expect, test } from 'vitest';
import { VueWrapper, mount, RouterLinkStub } from '@vue/test-utils';
import VAnswer from '@/components/VAnswer/VAnswer.vue';
import { getName } from '@/utils/getName';
import type VAvatar from '@/components/VAvatar/VAvatar.vue';
import type VAnswerContent from '@/components/VAnswerContent/VAnswerContent.vue';
import dayjs from 'dayjs';
import { cloneDeep } from 'es-toolkit/compat';
import { faker } from '@faker-js/faker';
import {
  createAnswerTree,
  createUserSafe,
  useHomeworkAnswersReactionsDestroy,
  useHomeworkAnswersReactionsCreate,
} from '@/api/generated';

const uuid = faker.string.uuid();

const defaultProps = {
  answer: createAnswerTree(),
  user: createUserSafe({
    uuid,
  }),
};

vi.mock('@formkit/auto-animate/vue', () => ({
  useAutoAnimate: () => [null],
}));

vi.mock('@/api/generated', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/generated')>();
  return {
    ...actual,
    useHomeworkAnswersReactionsDestroy: vi.fn(),
    useHomeworkAnswersReactionsCreate: vi.fn(),
  };
});
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
    vi.mocked(useHomeworkAnswersReactionsDestroy).mockReturnValue({
      mutateAsync: vi.fn(),
    } as unknown as ReturnType<typeof useHomeworkAnswersReactionsDestroy>);
    vi.mocked(useHomeworkAnswersReactionsCreate).mockReturnValue({
      mutateAsync: vi.fn(),
    } as unknown as ReturnType<typeof useHomeworkAnswersReactionsCreate>);
    wrapper = mount(VAnswer, defaultMountOptions);
  });

  const getNameWrapper = () => {
    return wrapper.find('[data-testid="name"]');
  };
  const getRankWrapper = () => {
    return wrapper.find('[data-testid="rank"]');
  };
  const getDateWrapper = () => {
    return wrapper.find('[data-testid="date"]');
  };
  const getAvatarWrapper = () => {
    return wrapper.findComponent<typeof VAvatar>('[data-testid="avatar"]');
  };
  const getContentWrapper = () => {
    return wrapper.findComponent<typeof VAnswerContent>(
      '[data-testid="content"]',
    );
  };

  const getAnswerContainerWrapper = () => {
    return wrapper.find('[data-testid="answer-container"]');
  };

  test('props to display avatar passed to VAvatar', () => {
    const { uuid: authorUuid } = defaultProps.answer.author;

    expect(getAvatarWrapper().props().userId).toBe(authorUuid);
  });

  test('answer has author name', () => {
    const { first_name, last_name, random_name } = defaultProps.answer.author;

    expect(getNameWrapper().text()).toBe(
      getName({
        firstName: first_name,
        lastName: last_name,
        randomName: random_name,
      }),
    );
  });

  test('answer shows author rank', () => {
    const props = cloneDeep(defaultProps);
    props.answer.author.rank = 'Эксперт курса';
    wrapper = mount(VAnswer, { ...defaultMountOptions, props });

    expect(getRankWrapper().text()).toBe('Эксперт курса');
  });

  test('answer without author rank has no rank label', () => {
    const props = cloneDeep(defaultProps);
    props.answer.author.rank = null;
    wrapper = mount(VAnswer, { ...defaultMountOptions, props });

    expect(getRankWrapper().exists()).toBe(false);
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

  test('props to render content passed to VAnswerContent', () => {
    expect(getContentWrapper().props().answer).toStrictEqual(
      defaultProps.answer,
    );
  });

  test('all answers have rounded corners and padding', () => {
    const answerContainer = getAnswerContainerWrapper();

    expect(answerContainer.classes()).toContain('rounded-8');
    expect(answerContainer.classes()).toContain('p-8');
  });

  test('answer without rank_label_color has transparent background', () => {
    const answerContainer = getAnswerContainerWrapper();
    const element = answerContainer.element as HTMLElement;

    // Browser returns empty string for transparent backgrounds
    expect(['transparent', '']).toContain(element.style.backgroundColor);
  });

  test('answer with rank_label_color has that background color', () => {
    const props = cloneDeep(defaultProps);
    props.answer.author.rank_label_color = '#F7CA45';
    wrapper = mount(VAnswer, { ...defaultMountOptions, props });

    const answerContainer = getAnswerContainerWrapper();
    const element = answerContainer.element as HTMLElement;

    expect(element.style.backgroundColor).toBe('rgb(247, 202, 69)');
  });
});
