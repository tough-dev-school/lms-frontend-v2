import { mockUserId, USER_1 } from '@/mocks/mockUserId';
import useToasts from '@/stores/toasts';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { userKeys } from '@/query';
import type { Decorator } from '@storybook/vue3-vite';
import type { Component } from 'vue';

const layoutDecorator = (story: Component, layout: Component) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const { disable } = useToasts();
    disable();

    const queryClient = useQueryClient();
    queryClient.setQueryData(userKeys.me(), {
      id: '',
      uuid: mockUserId(USER_1),
      username: 'johndoe@demo.com',
      firstName: 'Иван',
      lastName: 'Иванов',
      firstNameEn: 'John',
      lastNameEn: 'Doe',
      gender: 'male',
      linkedinUsername: 'johndoe',
      githubUsername: 'johndoe',
      telegramUsername: 'johndoe',
    });
  },
});

const defaultLayoutDecorator: Decorator = (story) =>
  layoutDecorator(story, VTransparentComponent);

export { defaultLayoutDecorator };
