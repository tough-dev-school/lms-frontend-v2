import VDefaultLayout from '@/layouts/VDefaultLayout/VDefaultLayout.vue';
import { mockMaterial } from '@/mocks/mockMaterial';
import { mockQuestion, STATIC_QUESTION } from '@/mocks/mockQuestion';
import { mockUserId, USER_1 } from '@/mocks/mockUserId';
import { userKeys } from '@/query';
import useHomework from '@/stores/homework';
import useMaterials from '@/stores/materials';
import useToasts from '@/stores/toasts';
import { useQueryClient } from '@tanstack/vue-query';

const layoutDecorator = (story: any, layout: any) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const toasts = useToasts();
    toasts.disable();

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

    const homework = useHomework();
    homework.$patch({
      question: mockQuestion(STATIC_QUESTION),
    });

    const materials = useMaterials();
    materials.$patch({ material: mockMaterial() });
  },
});

const defaultLayoutDecorator = (story: any) =>
  layoutDecorator(story, VDefaultLayout);

export { defaultLayoutDecorator };
