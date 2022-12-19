import { Page } from 'playwright';

export interface TestScenario {
  name: string;
  path: string;
  action?: () => Promise<void>;
}

export const getScenarios = (page: Page): TestScenario[] => {
  return [
    {
      name: 'Login — email login',
      path: `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
    },
    {
      name: 'Login — password login',
      path: `/iframe.html?args=&id=pages-app--login&viewMode=story#/login`,
      action: async () => {
        await page.click('[data-testid="to-password-mode"]');
      },
    },
    {
      name: 'Login — reset password',
      path: `/iframe.html?args=&id=pages-app--reset-password&viewMode=story#/login/reset`,
    },
    {
      name: 'Login — change password',
      path: `/iframe.html?args=&id=pages-app--change-password&viewMode=story#/auth/password/reset/1234567890/1234567890`,
    },
    {
      name: 'Settings',
      path: `/iframe.html?args=&id=pages-app--settings&viewMode=story#/settings`,
    },
    {
      name: 'Materials',
      path: '/iframe.html?args=&id=pages-app--notion-view&viewMode=story#/materials/1234567890',
    },
    {
      name: 'Materials Missing',
      path: '/iframe.html?id=pages-app--notion-view-missing&viewMode=story#/materials/1234567890',
    },
    {
      name: 'HomeworkAnswers',
      path: `/iframe.html?args=&id=pages-app--homework-answer-view&viewMode=story#/homework/answers/1234567890`,
    },
    {
      name: 'HomeworkExpert',
      path: '/iframe.html?args=&id=pages-app--homework-expert-view&viewMode=story#/homework/question-admin/1234567890',
    },
    {
      name: 'HomeworkQuestion',
      path: '/iframe.html?args=&id=pages-app--homework-question-view&viewMode=story#/homework/questions/1234567890',
    },
    {
      name: 'Shop',
      path: '/iframe.html?args=&id=pages-app--shop&viewMode=story#/shop',
    },
  ];
};
