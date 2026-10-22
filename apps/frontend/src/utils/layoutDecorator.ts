import VTransparentComponent from '@/mocks/VTransparentComponent.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { STUDENT } from '@/mocks/users';
import type { Component } from 'vue';

const layoutDecorator = (story: Component, layout: Component) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const queryClient = useQueryClient();
    queryClient.setQueryData(usersMeRetrieveQueryKey(), STUDENT);
  },
});

const defaultLayoutDecorator = (story: Component) =>
  layoutDecorator(story, VTransparentComponent);

export { defaultLayoutDecorator };
