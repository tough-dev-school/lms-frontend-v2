import { mockUserId, USER_1 } from '@/mocks/mockUserId';
import useToasts from '@/stores/toasts';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { userKeys } from '@/query';

const layoutDecorator = (story: any, layout: any) => ({
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

const defaultLayoutDecorator = (story: any) =>
  layoutDecorator(story, VTransparentComponent);

export { defaultLayoutDecorator };
