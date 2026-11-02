import { i18n } from '@/i18n';

const joinName = (firstName?: string, lastName?: string) =>
  [firstName, lastName].filter(Boolean).join(' ').trim();

export const getName = ({
  firstName,
  lastName,
  firstNameEn,
  lastNameEn,
  randomName,
}: {
  firstName?: string;
  lastName?: string;
  firstNameEn?: string;
  lastNameEn?: string;
  randomName?: string | null;
}) => {
  const name = joinName(firstName, lastName);
  const anonymous = i18n.global.t('common.anonymous');

  // Reading the locale ref here makes templates re-render names when the language changes.
  // The backend generates random names in Russian only, so English readers get a placeholder instead.
  // A Russian name still beats the placeholder when a student skipped the English one
  return {
    ru: () => name || randomName || anonymous,
    en: () => joinName(firstNameEn, lastNameEn) || name || anonymous,
  }[i18n.global.locale.value]();
};
