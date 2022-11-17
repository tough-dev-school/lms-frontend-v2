import type { Answer, Question } from '@/types/homework';
import convertKeysToCamelCase from '@/utils/convertKeysToCamelCase';

export const getQuestionData = (): Question => {
  return convertKeysToCamelCase({
    slug: '5cc7df02-4549-4236-b6d1-1e10d9622334',
    name: 'Вторая домашка',
    text: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at pellentesque metus. Duis nec elementum nunc. Nunc quis interdum massa, non blandit sem. Suspendisse ullamcorper risus elit, in consequat justo porttitor vel. Nulla posuere velit libero, nec faucibus sapien fermentum sit amet. Aliquam tincidunt mi ac mauris vestibulum, vitae auctor enim interdum. Mauris faucibus erat et sagittis posuere. Sed ultricies, nulla ac sollicitudin tincidunt, nunc quam dapibus lectus, sed ullamcorper eros magna eu orci. Sed laoreet nunc mollis convallis tincidunt. Fusce eu magna mi. In pulvinar consequat eros in porta. Vivamus eget aliquet tortor. Integer volutpat id justo eget pulvinar. Vivamus in facilisis odio. Aliquam orci ligula, tincidunt et nisi et, posuere aliquet urna. </p>',
  });
};

export const getAnswerData = (): Answer => {
  return convertKeysToCamelCase({
    created: '2020-07-25T19:43:00.750026',
    modified: '2020-07-25T19:43:00.750057',
    slug: '25dc5a1f-c3a9-42fa-abvg-51c313fcec47',
    question: '8a2ea4c6-8767-4756-92da-31a052550e2d',
    author: {
      uuid: '5cc7df02-4549-4236-b6d1-1e10d9622334',
      first_name: 'John',
      last_name: 'Doe',
    },
    text: '<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at pellentesque metus. Duis nec elementum nunc. Nunc quis interdum massa, non blandit sem. Suspendisse ullamcorper risus elit, in consequat justo porttitor vel. Nulla posuere velit libero, nec faucibus sapien fermentum sit amet. Aliquam tincidunt mi ac mauris vestibulum, vitae auctor enim interdum. Mauris faucibus erat et sagittis posuere. Sed ultricies, nulla ac sollicitudin tincidunt, nunc quam dapibus lectus, sed ullamcorper eros magna eu orci. Sed laoreet nunc mollis convallis tincidunt. Fusce eu magna mi. In pulvinar consequat eros in porta. Vivamus eget aliquet tortor. Integer volutpat id justo eget pulvinar. Vivamus in facilisis odio. Aliquam orci ligula, tincidunt et nisi et, posuere aliquet urna. </p>',
    src: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at pellentesque metus. Duis nec elementum nunc. Nunc quis interdum massa, non blandit sem. Suspendisse ullamcorper risus elit, in consequat justo porttitor vel. Nulla posuere velit libero, nec faucibus sapien fermentum sit amet. Aliquam tincidunt mi ac mauris vestibulum, vitae auctor enim interdum. Mauris faucibus erat et sagittis posuere. Sed ultricies, nulla ac sollicitudin tincidunt, nunc quam dapibus lectus, sed ullamcorper eros magna eu orci. Sed laoreet nunc mollis convallis tincidunt. Fusce eu magna mi. In pulvinar consequat eros in porta. Vivamus eget aliquet tortor. Integer volutpat id justo eget pulvinar. Vivamus in facilisis odio. Aliquam orci ligula, tincidunt et nisi et, posuere aliquet urna. ',
    descendants: [],
  });
};

export const getAnswersData = (length: number = 1): Answer[] => {
  return [...Array(length)].map(() => getAnswerData());
};
