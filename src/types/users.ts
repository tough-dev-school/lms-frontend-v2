export type Gender = 'female' | 'male' | undefined;

export interface User {
  id: string;
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  firstNameEn: string;
  lastNameEn: string;
  gender: Gender;
  linkedinUsername: string;
  githubUsername: string;
  telegramUsername: string;
  avatar?: string;
}

type EditableUserDataProperties =
  | 'firstName'
  | 'lastName'
  | 'firstNameEn'
  | 'lastNameEn'
  | 'gender'
  | 'linkedinUsername'
  | 'githubUsername'
  | 'telegramUsername';

export type EditableUserData = Partial<Pick<User, EditableUserDataProperties>>;
