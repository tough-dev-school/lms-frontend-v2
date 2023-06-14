import VDefaultLayout from '@/layouts/VDefaultLayout.vue';
import { questionData } from '@/mocks/homework';
import { getMaterialsData } from '@/mocks/materials';
import { getStudiesData } from '@/mocks/studies';
import useHomework from '@/stores/homework';
import useMaterials from '@/stores/materials';
import useStudies from '@/stores/studies';
import useToasts from '@/stores/toasts';
import useUser from '@/stores/user';
import { userId } from '@/mocks/userId';

const layoutDecorator = (story, layout) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const toasts = useToasts();
    toasts.disable();

    const user = useUser();
    user.$patch({
      id: '',
      uuid: userId,
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
      question: questionData,
    });

    const materials = useMaterials();
    materials.$patch({ material: getMaterialsData() });
  },
});

const defaultLayoutDecorator = (story) =>
  layoutDecorator(story, VDefaultLayout);

export { defaultLayoutDecorator };
