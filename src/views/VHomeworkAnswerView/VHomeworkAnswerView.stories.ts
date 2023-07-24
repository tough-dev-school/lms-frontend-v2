import type { Answer } from '@/types/homework';
import type { Meta, StoryFn } from '@storybook/vue3';

import { mockAnswer } from '@/mocks/mockAnswer';
import {
  STATIC_AUTHOR_1,
  STATIC_AUTHOR_2,
  STATIC_AUTHOR_3,
} from '@/mocks/mockAuthor';
import { mockComment } from '@/mocks/mockComment';
import { HTML_CONTENT, mockContent } from '@/mocks/mockContent';
import { STATIC_REACTION_2, STATIC_REACTIONS } from '@/mocks/mockReaction';
import { mockThread } from '@/mocks/mockThread';
import useHomework from '@/stores/homework';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import dayjs from 'dayjs';

import { VHomeworkAnswerView } from '.';

export default {
  component: VHomeworkAnswerView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VHomeworkAnswerView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkAnswerView },
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
                author: STATIC_AUTHOR_2,
                text: mockContent(HTML_CONTENT),
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
  template: '<VHomeworkAnswerView v-bind="args" />',
});

export const Default = {
  render: Template,
};
