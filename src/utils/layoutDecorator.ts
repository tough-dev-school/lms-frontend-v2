import { VDefaultLayout } from '@/layouts/VDefaultLayout';
import { mockMaterial } from '@/mocks/mockMaterial';
import { STATIC_QUESTION, mockQuestion } from '@/mocks/mockQuestion';
import { USER_1, mockUserId } from '@/mocks/mockUserId';
import useHomework from '@/stores/homework';
import useMaterials from '@/stores/materials';
import useToasts from '@/stores/toasts';
import useUser from '@/stores/user';

const layoutDecorator = (story: any, layout: any) => ({
  components: { layout, story },
  setup() {
    const toasts = useToasts();
    toasts.disable();

    const user = useUser();
    user.$patch({
      firstName: 'Иван',
      firstNameEn: 'John',
      gender: 'male',
      githubUsername: 'johndoe',
      id: '',
      lastName: 'Иванов',
      lastNameEn: 'Doe',
      linkedinUsername: 'johndoe',
      telegramUsername: 'johndoe',
      username: 'johndoe@demo.com',
      uuid: mockUserId(USER_1),
    });

    const homework = useHomework();
    homework.$patch({
      question: mockQuestion(STATIC_QUESTION),
    });

    const materials = useMaterials();
    materials.$patch({ material: mockMaterial() });
  },
  template: '<layout><story /></layout>',
});

const defaultLayoutDecorator = (story: any) =>
  layoutDecorator(story, VDefaultLayout);

export { defaultLayoutDecorator };
