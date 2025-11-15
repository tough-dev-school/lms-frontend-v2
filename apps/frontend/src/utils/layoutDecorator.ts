import { mockUserId, USER_1 } from '@/mocks/mockUserId';
import useToasts from '@/stores/toasts';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { usersMeRetrieveQueryKey } from '@/api/generated/hooks';
import type { Component } from 'vue';

const layoutDecorator = (story: Component, layout: Component) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const { disable } = useToasts();
    disable();

    const queryClient = useQueryClient();
    queryClient.setQueryData(usersMeRetrieveQueryKey(), {
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

const defaultLayoutDecorator = (story: Component) =>
  layoutDecorator(story, VTransparentComponent);

export { defaultLayoutDecorator };
