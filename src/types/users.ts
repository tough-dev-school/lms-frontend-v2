export type Gender = 'female' | 'male' | undefined;

export interface User {
  firstName: string;
  firstNameEn: string;
  gender: Gender;
  githubUsername: string;
  id: string;
  lastName: string;
  lastNameEn: string;
  linkedinUsername: string;
  telegramUsername: string;
  username: string;
  uuid: string;
}

type EditableUserDataProperties =
  | 'firstName'
  | 'firstNameEn'
  | 'gender'
  | 'githubUsername'
  | 'lastName'
  | 'lastNameEn'
  | 'linkedinUsername'
  | 'telegramUsername';

export type EditableUserData = Partial<Pick<User, EditableUserDataProperties>>;
