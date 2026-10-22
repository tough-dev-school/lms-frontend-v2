import { GenderEnum } from '@/api/generated';
import type { UserSafe, UserSelf } from '@/api/generated';
import { USER_1, USER_2, USER_3 } from '@/mocks/mockUserId';

// The signed-in student. Most stories render the app from her point of view
export const STUDENT: UserSelf = {
  id: 10_432,
  uuid: USER_1,
  username: 'anna.kovaleva@gmail.com',
  email: 'anna.kovaleva@gmail.com',
  first_name: 'Анна',
  last_name: 'Ковалёва',
  first_name_en: 'Anna',
  last_name_en: 'Kovaleva',
  random_name: 'Любопытная Сова',
  gender: GenderEnum.female,
  github_username: 'akovaleva',
  linkedin_username: 'anna-kovaleva-dev',
  telegram_username: 'anna_kovaleva',
  avatar: null,
  is_staff: false,
  rank: null,
  rank_label_color: null,
};

// A student who has not filled in the certificate names yet
export const NEW_STUDENT: UserSelf = {
  id: 11_807,
  uuid: 'c1d6a8f2-4b3e-4f0a-9d2c-7e5b8a1f3c64',
  username: 'd.orlov@yandex.ru',
  email: 'd.orlov@yandex.ru',
  first_name: '',
  last_name: '',
  first_name_en: '',
  last_name_en: '',
  random_name: 'Задумчивый Ёж',
  github_username: '',
  linkedin_username: '',
  telegram_username: '',
  avatar: null,
  is_staff: false,
  rank: null,
  rank_label_color: null,
};

export const STAFF: UserSelf = {
  ...STUDENT,
  is_staff: true,
};

export const toUserSafe = (user: UserSelf): UserSafe => ({
  uuid: user.uuid,
  first_name: user.first_name,
  last_name: user.last_name,
  first_name_en: user.first_name_en,
  last_name_en: user.last_name_en,
  random_name: user.random_name,
  avatar: user.avatar,
  rank: user.rank,
  rank_label_color: user.rank_label_color,
});

export const STUDENT_SAFE = toUserSafe(STUDENT);

export const CLASSMATE_1: UserSafe = {
  uuid: USER_2,
  first_name: 'Дмитрий',
  last_name: 'Соколов',
  first_name_en: 'Dmitry',
  last_name_en: 'Sokolov',
  random_name: 'Смелый Барсук',
  avatar: null,
  rank: null,
  rank_label_color: null,
};

export const CLASSMATE_2: UserSafe = {
  uuid: USER_3,
  first_name: 'Екатерина',
  last_name: 'Морозова',
  first_name_en: 'Ekaterina',
  last_name_en: 'Morozova',
  random_name: 'Тихая Выдра',
  avatar: null,
  rank: null,
  rank_label_color: null,
};

export const CLASSMATE_3: UserSafe = {
  uuid: '5b0e2c91-7f4d-4a6b-8e13-2d9c0f6a4b78',
  first_name: 'Артём',
  last_name: 'Лебедев',
  first_name_en: 'Artem',
  last_name_en: 'Lebedev',
  random_name: 'Быстрый Лис',
  avatar: null,
  rank: null,
  rank_label_color: null,
};

// Some students never fill in their names, the interface shows the random name then
export const ANONYMOUS_CLASSMATE: UserSafe = {
  uuid: 'e8a3f5d1-2c6b-4e9a-b047-6f1d3c8e2a95',
  first_name: '',
  last_name: '',
  first_name_en: '',
  last_name_en: '',
  random_name: 'Задумчивый Ёж',
  avatar: null,
  rank: null,
  rank_label_color: null,
};

export const LONG_NAME_CLASSMATE: UserSafe = {
  uuid: '0f7c4e2a-9b1d-4c83-a6e5-3d8b2f9c1a07',
  first_name: 'Александра-Виктория',
  last_name: 'Константинопольская-Преображенская',
  first_name_en: 'Alexandra-Victoria',
  last_name_en: 'Konstantinopolskaya-Preobrazhenskaya',
  random_name: 'Мудрый Филин',
  avatar: null,
  rank: null,
  rank_label_color: null,
};

// Ranked authors (mentors, experts) get their answers highlighted with the label color
export const MENTOR: UserSafe = {
  uuid: '3a9d6b2e-1f4c-4d87-b5a0-8c2e7f1d9b36',
  first_name: 'Фёдор',
  last_name: 'Борщёв',
  first_name_en: 'Fedor',
  last_name_en: 'Borshchev',
  random_name: 'Опытный Ворон',
  avatar: null,
  rank: '1',
  rank_label_color: '#F7CA45',
};

export const CLASSMATES: UserSafe[] = [
  CLASSMATE_1,
  CLASSMATE_2,
  CLASSMATE_3,
  ANONYMOUS_CLASSMATE,
  MENTOR,
];
