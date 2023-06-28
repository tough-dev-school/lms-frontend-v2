import { VDefaultLayout } from '@/layouts/VDefaultLayout';
import { getMaterialsData } from '@/mocks/materials';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockUserId } from '@/mocks/mockUserId';
import useHomework from '@/stores/homework';
import useMaterials from '@/stores/materials';
import useToasts from '@/stores/toasts';
import useUser from '@/stores/user';

const layoutDecorator = (story: any, layout: any) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const toasts = useToasts();
    toasts.disable();

    const user = useUser();
    user.$patch({
      id: '',
      uuid: mockUserId(),
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
      question: mockQuestion(),
    });

    const materials = useMaterials();
    materials.$patch({ material: getMaterialsData() });
  },
});

const defaultLayoutDecorator = (story: any) =>
  layoutDecorator(story, VDefaultLayout);

export { defaultLayoutDecorator };
