import { mockQuestion, STATIC_QUESTION } from '@/mocks/mockQuestion';
import { mockUserId, USER_1 } from '@/mocks/mockUserId';
import useHomework from '@/stores/homework';
import useToasts from '@/stores/toasts';
import useUser from '@/stores/user';
import VTransparentComponent from '@/mocks/VTransparentComponent.vue';

const layoutDecorator = (story: any, layout: any) => ({
  components: { layout, story },
  template: '<layout><story /></layout>',
  setup() {
    const toasts = useToasts();
    toasts.disable();

    const user = useUser();
    user.$patch({
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
  },
});

const defaultLayoutDecorator = (story: any) =>
  layoutDecorator(story, VTransparentComponent);

export { defaultLayoutDecorator };
