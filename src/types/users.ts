export type Gender = 'female' | 'male' | undefined;

export interface User {
  id: string;
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  first_name_en: string;
  last_name_en: string;
  gender: Gender;
  linkedin_username: string;
  github_username: string;
}

type EditableUserDataProperties =
  | 'first_name'
  | 'last_name'
  | 'first_name_en'
  | 'last_name_en'
  | 'gender'
  | 'linkedin_username'
  | 'github_username';

export type EditableUserData = Partial<Pick<User, EditableUserDataProperties>>;
