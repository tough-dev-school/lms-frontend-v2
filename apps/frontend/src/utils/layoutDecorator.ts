import { mockUserId, USER_1 } from '@/mocks/mockUserId';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { usersMeRetrieveQueryKey, createUserSafe } from '@/api/generated';
import type { Component } from 'vue';

const layoutDecorator = (story: Component, layout: Component) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const queryClient = useQueryClient();
    queryClient.setQueryData(
      usersMeRetrieveQueryKey(),
      createUserSafe({
        uuid: mockUserId(USER_1),
        first_name: 'Иван',
        last_name: 'Иванов',
        first_name_en: 'John',
        last_name_en: 'Doe',
      }),
    );
  },
});

const defaultLayoutDecorator = (story: Component) =>
  layoutDecorator(story, VTransparentComponent);

export { defaultLayoutDecorator };
