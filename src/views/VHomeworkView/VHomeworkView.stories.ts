import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeworkView from './VHomeworkView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockThread } from '@/mocks/mockThread';
import { mockAnswer } from '@/mocks/mockAnswerDetailed';
import { HTML_CONTENT, mockContent } from '@/mocks/mockContent';
import {
  STATIC_AUTHOR_1,
  STATIC_AUTHOR_2,
  STATIC_AUTHOR_3,
} from '@/mocks/mockAuthor';
import { mockComment } from '@/mocks/mockComment';
import dayjs from 'dayjs';
import { STATIC_REACTIONS, STATIC_REACTION_2 } from '@/mocks/mockReaction';

export default {
  title: 'App/VHomeworkView',
  component: VHomeworkView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkView },
  setup() {
    const homework = useHomework();

    const answers: Answer[] = [
      mockThread({
        // Root
        ...mockAnswer({
          author: STATIC_AUTHOR_1,
          text: mockContent(HTML_CONTENT),
        }),
        descendants: [
          // First thread
          // 1
          mockComment({
            ...mockThread({
              ...mockAnswer({
                text: mockContent(HTML_CONTENT),
                author: STATIC_AUTHOR_2,
              }),
            }),
            descendants: [
              // 2
              mockComment({
                ...mockThread(
                  mockAnswer({ author: STATIC_AUTHOR_1, hasDescendants: true }),
                ),
                descendants: [
                  // 3
                  mockComment(
                    mockThread(
                      mockAnswer({
                        author: STATIC_AUTHOR_2,
                        reactions: STATIC_REACTIONS,
                      }),
                    ),
                  ),
                ],
              }),
            ],
          }),
          // Second thread
          // 1
          mockComment({
            ...mockThread({
              ...mockAnswer({
                author: STATIC_AUTHOR_3,
                reactions: [STATIC_REACTION_2],
              }),
            }),
            descendants: [
              // 2
              mockComment(
                mockThread(
                  mockAnswer({
                    author: STATIC_AUTHOR_1,
                    created: dayjs().toISOString(),
                  }),
                ),
              ),
            ],
          }),
        ],
      }),
    ];

    homework.$patch({
      answers: answers,
    });

    return { args };
  },
  template: '<VHomeworkView v-bind="args" />',
});

export const Default = {
  render: Template,
};
