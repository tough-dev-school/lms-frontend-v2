import { describe, beforeEach, expect, test, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import VModuleCard from './VModuleCard.vue';
import {
  createQuestion,
  createLesson,
  createModuleDetail,
} from '@/api/generated/mocks';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { nextTick } from 'vue';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';

vi.mock('@tanstack/vue-query', () => ({
  useQueryClient: () => ({}),
}));

const defaultProps = {
  module: createModuleDetail({ lesson_count: 5 }),
  courseId: faker.number.int(),
  index: 0,
};

const defaultMountOptions = {
  props: defaultProps,
  shallow: true,
  global: {
    stubs: {
      RouterLink: RouterLinkStub,
    },
  },
};

const getModuleCard = (wrapper: VueWrapper) =>
  wrapper.find('[data-testid="module-card"]');
const getModuleName = (wrapper: VueWrapper) =>
  wrapper.find('[data-testid="module-name"]');
const getModuleDescription = (wrapper: VueWrapper) =>
  wrapper.find('[data-testid="module-description"]');
const getModuleStartDate = (wrapper: VueWrapper) =>
  wrapper.find('[data-testid="module-start-date"]');

describe('VModuleCard', () => {
  let wrapper: VueWrapper<InstanceType<typeof VModuleCard>>;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(VModuleCard, defaultMountOptions);
  });

  describe('rendering', () => {
    test('renders module name', async () => {
      const module = createModuleDetail({ lesson_count: 2 });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        shallow: true,
        props: { module, courseId, index: 0 },
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
            VHeading: VTransparentComponent,
          },
        },
      });

      await nextTick();

      expect(getModuleName(wrapper).text()).toBe(module.name);
    });

    test('renders module description when provided', () => {
      const module = createModuleDetail({
        description: faker.lorem.sentence(),
      });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(getModuleDescription(wrapper).exists()).toBe(true);
      expect(getModuleDescription(wrapper).text()).toBe(module.description);
    });

    test('does not render description when not provided', () => {
      const module = createModuleDetail({ description: null });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(getModuleDescription(wrapper).exists()).toBe(false);
    });

    test('renders start date when provided', () => {
      const startDate = faker.date.future().toISOString();
      const module = createModuleDetail({ start_date: startDate });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(getModuleStartDate(wrapper).exists()).toBe(true);
    });

    test('does not render start date when not provided', () => {
      const module = createModuleDetail({ start_date: null });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(getModuleStartDate(wrapper).exists()).toBe(false);
    });
  });

  describe('styling', () => {
    test('applies yellow color class for index 0', () => {
      const module = createModuleDetail();
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(getModuleCard(wrapper).classes()).toContain('!bg-accent-yellow');
    });

    test('applies orange color class for index 1', () => {
      const module = createModuleDetail();
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 1 },
      });

      expect(getModuleCard(wrapper).classes()).toContain('!bg-accent-orange');
    });

    test('applies green color class for index 2', () => {
      const module = createModuleDetail();
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 2 },
      });

      expect(getModuleCard(wrapper).classes()).toContain('!bg-accent-green');
    });

    test('applies blue color class for index 3', () => {
      const module = createModuleDetail();
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 3 },
      });

      expect(getModuleCard(wrapper).classes()).toContain('!bg-accent-blue');
    });

    test('applies grayscale styling when module has not started', () => {
      const module = createModuleDetail({
        has_started: false,
        start_date: dayjs().add(1, 'day').toISOString(),
      });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(getModuleCard(wrapper).classes()).toContain('grayscale');
      expect(getModuleCard(wrapper).classes()).toContain('pointer-events-none');
      expect(getModuleCard(wrapper).classes()).toContain('cursor-not-allowed');
    });

    test('applies hover styling when module has started', () => {
      const module = createModuleDetail({
        has_started: true,
        start_date: dayjs().subtract(1, 'day').toISOString(),
      });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(getModuleCard(wrapper).classes()).toContain('hover:scale-[1.02]');
      expect(getModuleCard(wrapper).classes()).toContain('hover:shadow');
    });
  });

  describe('component variant', () => {
    test('renders as div when module has not started', () => {
      const module = createModuleDetail({
        has_started: false,
        start_date: dayjs().add(1, 'day').toISOString(),
      });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      expect(wrapper.find('div.VModuleCard').exists()).toBe(true);
    });

    test('renders as RouterLink when module has started', async () => {
      const module = createModuleDetail({
        has_started: true,
        start_date: dayjs().subtract(1, 'day').toISOString(),
        lesson_count: 5,
      });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        shallow: false,
        props: { module, courseId, index: 0 },
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    });
  });

  describe('navigation routing', () => {
    test('navigates to module page when module has multiple lessons', async () => {
      const module = createModuleDetail({
        has_started: true,
        start_date: dayjs().subtract(1, 'day').toISOString(),
        lesson_count: 5,
      });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        shallow: false,
        props: { module, courseId, index: 0 },
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      });

      await nextTick();

      const routerLink = wrapper.findComponent(RouterLinkStub);
      expect(routerLink.props('to')).toEqual({
        name: 'module',
        params: { courseId, moduleId: module.id },
      });
    });

    test('navigates to materials when single lesson has material', async () => {
      const lesson = createLesson({
        material: {
          id: faker.string.uuid(),
          title: faker.lorem.words(3),
        },
        question: undefined,
        call: undefined,
      });
      const module = createModuleDetail({
        has_started: true,
        start_date: dayjs().subtract(1, 'day').toISOString(),
        lesson_count: 1,
        single_lesson_id: lesson.id,
      });
      const courseId = faker.number.int();

      vi.mocked(query.fetchLesson).mockResolvedValue(lesson);

      wrapper = mount(VModuleCard, {
        shallow: false,
        props: { module, courseId, index: 0 },
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      });

      await nextTick();

      const routerLink = wrapper.findComponent(RouterLinkStub);
      expect(routerLink.props('to')).toEqual({
        name: 'materials',
        params: { materialId: lesson.material!.id },
      });
    });

    test('navigates to homework when single lesson has question', async () => {
      const lesson = createLesson({
        material: undefined,
        call: undefined,
        question: createQuestion(),
      });
      const module = createModuleDetail({
        has_started: true,
        start_date: dayjs().subtract(1, 'day').toISOString(),
        lesson_count: 1,
        single_lesson_id: lesson.id,
      });
      const courseId = faker.number.int();

      vi.mocked(query.fetchLesson).mockResolvedValue(lesson);

      wrapper = mount(VModuleCard, {
        shallow: false,
        props: { module, courseId, index: 0 },
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      });

      await nextTick();

      const routerLink = wrapper.findComponent(RouterLinkStub);
      expect(routerLink.props('to')).toEqual({
        name: 'homework',
        params: { questionId: lesson.question.slug },
      });
    });

    test('uses default module navigation when single lesson has call', async () => {
      const lesson = createLesson({
        material: undefined,
        question: undefined,
        call: {
          name: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          url: faker.internet.url(),
          video: [],
          datetime: faker.date.future().toISOString(),
          recommended_video_provider: null,
        },
      });
      const module = createModuleDetail({
        has_started: true,
        start_date: dayjs().subtract(1, 'day').toISOString(),
        lesson_count: 1,
        single_lesson_id: lesson.id,
      });
      const courseId = faker.number.int();

      vi.mocked(query.fetchLesson).mockResolvedValue(lesson);

      wrapper = mount(VModuleCard, {
        shallow: false,
        props: { module, courseId, index: 0 },
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      });

      await nextTick();

      const routerLink = wrapper.findComponent(RouterLinkStub);
      expect(routerLink.props('to')).toEqual({
        name: 'module',
        params: { courseId, moduleId: module.id },
      });
    });
  });

  describe('lesson fetching', () => {
    test('fetches lesson data when lesson count is 1', async () => {
      const module = createModuleDetail({
        has_started: true,
        lesson_count: 1,
        single_lesson_id: faker.number.int(),
      });
      const courseId = faker.number.int();
      const lesson = createLesson();

      vi.mocked(query.fetchLesson).mockResolvedValue(lesson);

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      await nextTick();

      expect(query.fetchLesson).toHaveBeenCalledWith(expect.anything(), {
        lessonId: module.single_lesson_id,
      });
    });

    test('does not fetch lesson data when lesson count is not 1', async () => {
      const module = createModuleDetail({
        has_started: true,
        lesson_count: 5,
      });
      const courseId = faker.number.int();

      wrapper = mount(VModuleCard, {
        ...defaultMountOptions,
        props: { module, courseId, index: 0 },
      });

      await nextTick();

      expect(query.fetchLesson).not.toHaveBeenCalled();
    });
  });
});
